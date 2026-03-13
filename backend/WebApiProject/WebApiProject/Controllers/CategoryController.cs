using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApiProject.DTOs;
using WebApiProject.Models;
using WebApiProject.Services;

namespace WebApiProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService categoryService;

        public CategoryController(ICategoryService _categoryService) {
            categoryService = _categoryService;
        }
        [HttpGet]
        public IActionResult GetCategories() {
            var categories = categoryService.GetAll();
            if (categories == null)
            return NotFound();

            return Ok(categories);
        }
        [HttpGet]
        [Route("{id}")]
        public IActionResult getCategoryById(int id) {
            var categoryDto = categoryService.GetById(id);

            if (categoryDto == null)
                return NotFound();

            return Ok(categoryDto);

        }
        [HttpPost]
        [Authorize]
        public IActionResult addCategory(Category category)
        {
            categoryService.Add(category);
            categoryService.Save();
            return CreatedAtAction(
                "getCategoryById",
                new { id = category.Id },
                category
            );
        }
    }
}
