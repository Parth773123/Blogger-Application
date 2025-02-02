using blogger_backend.Data;
using blogger_backend.Entity;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.CompilerServices;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace blogger_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IRepository<User> _userRepository;

        public UserController(IRepository<User> userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<ActionResult> GetUsers()
        {
            List<User> userList = await _userRepository.GetAll();
            return Ok(userList);
        }

        [HttpGet("{Id}")]
        public async Task<ActionResult> GetUserById([FromRoute] int Id)
        {
            if (Id is <= 0) return BadRequest("Id cannot be null or less than or 1");

            User userModel = await _userRepository.GetById(Id);

            if (userModel == null) return NotFound("User not found");
            
            return Ok(userModel);
        }

        [HttpPost]
        public async Task<ActionResult> CreateUser([FromBody] User userModel)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);

            if (userModel == null) return BadRequest("Please provide complete details");

            try
            {
                User user = new User()
                {
                    Name = userModel.Name,
                    Email = userModel.Email,
                    Password = userModel.Password
                };

                await _userRepository.AddAsync(user);
                await _userRepository.SaveChangesAsync();
                Console.WriteLine($"User created with name {userModel.Name}");
                return StatusCode(201);
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return StatusCode(500);
            }
        }
    }
}
