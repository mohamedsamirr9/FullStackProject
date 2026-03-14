using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApiProject.DTOs;
using WebApiProject.Models;
using WebApiProject.Services;

namespace WebApiProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService productService;

        public ProductController(IProductService _productService) {
            productService = _productService;
        }

        [HttpGet("all")]
        public IActionResult AllProducts() {
            List<Product> products = productService.GetAll();
            return Ok(products);
        }
        [HttpGet("{page}/{pageSize}")]
        public IActionResult ProductsPerPage(int page = 1,  int pageSize = 10) {
            var products = productService.GetProductsPerPages(page,pageSize);
            return Ok(products);

        }
        [HttpGet("category/{id}")]
        public IActionResult FilterProductsByCategory(int id) { 
            List<Product> products = productService.GetProductsByCategory(id);
            return Ok(products);
        }
        [HttpGet("category/{id}/{page}/{pageSize}")]
        public IActionResult FilterProductsByCategoryByPage(int id, int page = 1, int pageSize = 10)
        {
            var products = productService.GetCategoryProductsPerPage(id,page,pageSize);
            return Ok(products);
        }
        [HttpGet("{name}/{page}/{pageSize}")]
        public IActionResult SearchByName(string name, int page = 1, int pageSize = 10) { 
            var products = productService.SearchByName(name,page,pageSize);
            return Ok(products);
        }
        [HttpGet]
        [Route("{id}")]
        public IActionResult GetProduct(int id) {
            ProductWithCategoryDTO product = productService.GetById(id);
            if (product == null) { 
                return NotFound();
            }
            return Ok(product);
        }
        [HttpPost]
        public IActionResult AddProduct(Product product) {
            productService.Add(product);
            productService.Save();
            return CreatedAtAction("GetProduct", new { id = product.Id }, product);
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(int id) {
            var product = productService.GetById(id);
            if (product == null)
            {
                return NotFound();
            }
            productService.Delete(id);
            productService.Save();
            return NoContent();
        }
        [HttpPut]
        public IActionResult UpdateProduct(Product product) { 
            var p =  productService.GetById(product.Id);
            if (p == null) {
                return NotFound();
            }
            productService.Update(product);
            productService.Save();
            return NoContent();
        }
        //[HttpPut]
        //public IActionResult UpdateProduct(Product product) { }

    }
}
