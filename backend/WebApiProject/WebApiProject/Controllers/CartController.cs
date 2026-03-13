using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using WebApiProject.DTOs;
using WebApiProject.Models;
using WebApiProject.Services;

namespace WebApiProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ICartService cartService;

        public CartController(ICartService _cartService) {
            cartService = _cartService;
        }
        [HttpGet]
        public IActionResult Get() {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var result = cartService.GetCartWithProducts(userId);
            return Ok(result);
        }
        [Authorize]
        [HttpPost]
        public IActionResult addCartItem(CartItemDTO cartItemDTO)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            cartService.AddCartItem(userId,cartItemDTO);
            cartService.Save();
            return Created();

        }

        [Authorize]
        [HttpPut]
        public IActionResult updateQuantity(CartItemDTO cartItemDTO)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            cartService.UpdateCartItem(userId,cartItemDTO);
            cartService.Save();
            return Ok(new { message = "Quantity updated" });

        }
        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult RemoveItem(int id)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            cartService.RemoveCartItem(userId,id);
            cartService.Save();
            return Ok(new { message = "Item Deleted" });
        }
    }
}
