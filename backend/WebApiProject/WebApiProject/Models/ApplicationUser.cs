using Microsoft.AspNetCore.Identity;

namespace WebApiProject.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Cart? Cart { get; set; }
    }
}
