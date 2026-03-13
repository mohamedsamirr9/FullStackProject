using WebApiProject.DTOs;

namespace WebApiProject.Services
{
    public interface IAuthService
    {
        Task<string> RegisterAsync(RegisterDTO registerDTO);
        Task<string> LoginAsync(LoginDTO loginDTO);
    }
}
