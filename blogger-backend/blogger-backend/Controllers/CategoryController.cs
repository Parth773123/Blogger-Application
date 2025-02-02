using blogger_backend.Data;
using blogger_backend.Entity;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace blogger_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly IRepository<Category> _repository;

        public CategoryController(IRepository<Category> categoryRepository)
        {
            _repository = categoryRepository;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllCategories()
        {
            List<Category> categoryList = await _repository.GetAll();

            return Ok(categoryList);
        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> GetCategoryById(int Id)
        {
            if (Id <= 0) return BadRequest("Id cannot be null");

            Category category = await _repository.GetById(Id);

            if (category == null) return NotFound("Category Not Found");

            return Ok(category);
        }

        [HttpPost]
        public async Task<ActionResult> CreateCategory(Category category)
        {
            if (category == null) return BadRequest("Category cannot be null");

            try
            {
                await _repository.AddAsync(category);
                await _repository.SaveChangesAsync();
                Console.WriteLine($"Category {category.Name} was successfully added with");

                return StatusCode(201);
            }
            catch (Exception ex) 
            {
                Console.WriteLine("An error occured", ex.Message);
                return StatusCode(500);
            }
        }

        [HttpDelete("{Id}")]
        public async Task<ActionResult> DeleteCategory(int Id)
        {
            if(Id == 0) return BadRequest("Id cannot be null");

            Category category = await _repository.GetById(Id);

            if (category == null) return NotFound();

            try
            {
                await _repository.DeleteAsync(Id);
                await _repository.SaveChangesAsync();
                return StatusCode(201);
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                return StatusCode(500);
            }
        }
    }
}
