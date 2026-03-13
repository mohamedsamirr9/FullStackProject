using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApiProject.DTOs;
using WebApiProject.Services;

namespace WebApiProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService authService;

        public AuthController(IAuthService _authService)
        {
            authService = _authService;
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDTO registerDTO)
        {
            var result =  await authService.RegisterAsync(registerDTO);
            if (result != "User Created Successfully")
                return BadRequest(new { message = result });
           
            return Ok(new { message = result });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDTO loginDTO)
        {
            var token = await authService.LoginAsync(loginDTO);
            if (token == null)
            {
                return Unauthorized("Invalid Email or Password");
            }
            return Ok(new{ token,
                expiration = DateTime.Now.AddHours(1)
            });


        }
    }
}
