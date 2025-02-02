using blogger_backend.Data;
using blogger_backend.DTO;
using blogger_backend.Entity;
using Microsoft.AspNetCore.Authentication.BearerToken;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace blogger_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IRepository<User> _userRepository;

        public AuthController(IRepository<User> userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpPost]
        public async Task<IResult> Login([FromBody] LoginDTO loginModel)
        {
            User user = (await _userRepository.GetAll(x => x.Email == loginModel.Email)).FirstOrDefault();

            if(user is not null && user.Password == loginModel.Password)
            {
                ClaimsPrincipal claimsPrincipal = new ClaimsPrincipal(
                    new ClaimsIdentity(
                        new[] { new Claim(ClaimTypes.Email, loginModel.Email) },
                        BearerTokenDefaults.AuthenticationScheme
                        )
                    );
                return Results.SignIn(claimsPrincipal);
            }
            else
            {
                return Results.BadRequest();
            }
        }
    }
}
