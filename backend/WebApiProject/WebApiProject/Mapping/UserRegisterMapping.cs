using WebApiProject.DTOs;
using WebApiProject.Models;

namespace WebApiProject.Mapping
{
    public static class UserRegisterMapping
    {
        public static ApplicationUser ToUser(this RegisterDTO user)
        {
            return new ApplicationUser
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                UserName = user.Email,
            };
        }
    }
}
