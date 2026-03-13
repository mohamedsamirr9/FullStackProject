using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebApiProject.DTOs;
using WebApiProject.Mapping;
using WebApiProject.Models;
using WebApiProject.Repositories;

namespace WebApiProject.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly ICartRepository cartRepository;

        public AuthService(UserManager<ApplicationUser> _userManager,ICartRepository _cartRepository) {
            userManager = _userManager;
            cartRepository = _cartRepository;

        }

        public async Task<string> LoginAsync(LoginDTO loginDTO)
        {
            var user =  await userManager.FindByEmailAsync(loginDTO.Email);
            if (user == null)
            {
                return null;
            }
            var result = await userManager.CheckPasswordAsync(user, loginDTO.Password);

            if (!result)
            {
                return null;
            }

            List<Claim> userClaims = new List<Claim>();
            userClaims.Add(new Claim(ClaimTypes.NameIdentifier, user.Id));
            userClaims.Add(new Claim(ClaimTypes.Name,user.FirstName));
            userClaims.Add(new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString()));   
            var userRoles = await userManager.GetRolesAsync(user);
            foreach (var role in userRoles) { 
                userClaims.Add(new Claim(ClaimTypes.Role, role));
            }

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("ThisIsAVeryLongSecretKeyForJWT123456!"));

            SigningCredentials signingCred = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            JwtSecurityToken token = new JwtSecurityToken(
                audience: "http://localhost:4200/",
                issuer: "http://localhost:5069/",
                claims: userClaims,
                    expires: DateTime.Now.AddHours(1),
                signingCredentials: signingCred
                );
            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);
            return tokenString;

        }

        public async Task<string> RegisterAsync(RegisterDTO registerDTO)
        {
            if (registerDTO.Password != registerDTO.ConfirmPassword) {
                return "Passwords do not match";
            }
            var user = registerDTO.ToUser();
            var result = await userManager.CreateAsync(user,registerDTO.Password);
            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(e => e.Description);
                return string.Join(",", errors);
            }
            cartRepository.CreateCart(user.Id);
            cartRepository.Save();
            return "User Created Successfully";
        }
    }
}
