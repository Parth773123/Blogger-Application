using blogger_backend.Data;
using blogger_backend.DTO;
using blogger_backend.Entity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace blogger_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogsController : ControllerBase
    {
        private readonly IRepository<Blog> _blogRepository;

        public BlogsController(IRepository<Blog> blogRepository)
        {
            _blogRepository = blogRepository;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllBlogs()
        {
            List<Blog> blogList = await _blogRepository.GetAll();

            return Ok(blogList);
        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> GetBlogById([FromRoute] int Id)
        {
            if (Id <= 0) return BadRequest("Id cannot be null");

            Blog blog = await _blogRepository.GetById(Id);

            if (blog == null) return NotFound("Blog Not Found");

            return Ok(blog);
        }

        [HttpGet("featured")]
        public async Task<ActionResult> GetFeaturedBlogs()
        {
            try
            {
                List<Blog> blogList = await _blogRepository.GetAll(x => x.IsFeatured == true);
                return Ok(blogList);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occured {ex.Message}");
            }
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> CreateBlog([FromBody] BlogDTO blog)
        {
            if (blog == null) return BadRequest("Category cannot be null");

            try
            {
                Blog model = new Blog()
                {
                    CategoryId = blog.CategoryId,
                    Title = blog.Title,
                    Description = blog.Description,
                    Content = blog.Content,
                    Image = blog.Image,
                    IsFeatured = blog.IsFeatured
                };

                await _blogRepository.AddAsync(model);
                await _blogRepository.SaveChangesAsync();
                Console.WriteLine($"Category {blog.Title} was successfully added with");

                return StatusCode(201);
            }
            catch (Exception ex)
            {
                Console.WriteLine("An error occured", ex.Message);
                return StatusCode(500);
            }
        }

        [Authorize]
        [HttpPut("{Id}")]
        public async Task<ActionResult> UpdateBlog([FromRoute] int Id, [FromBody] BlogDTO blogModel)
        {
            if (Id <= 0) return BadRequest("Id cannot be less than zero");

            Blog blog = await _blogRepository.GetById(Id);

            if (blog == null) return NotFound($"Blog with Id {Id} not found");

            blog.Title = blogModel.Title;
            blog.Description = blogModel.Description;
            blog.Content = blogModel.Content;
            blog.Image = blogModel.Image;
            blog.IsFeatured = blogModel.IsFeatured;

            try
            {
                _blogRepository.UpdateAsync(blog);
                await _blogRepository.SaveChangesAsync();
                return NoContent();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Conflict("A concurrency error occured. This blog may have been updated by another user");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occured {ex.Message}");
            }
        }

        [Authorize]
        [HttpDelete("{Id}")]
        public async Task<ActionResult> DeleteBlog([FromRoute] int Id)
        {
            if (Id == 0) return BadRequest("Id cannot be null");

            Blog blogEntity = await _blogRepository.GetById(Id);

            if (blogEntity == null) return NotFound();

            try
            {
                await _blogRepository.DeleteAsync(Id);
                await _blogRepository.SaveChangesAsync();
                return StatusCode(201);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return StatusCode(500);
            }
        }
    }
}
