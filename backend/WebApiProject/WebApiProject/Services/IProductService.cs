using WebApiProject.DTOs;
using WebApiProject.Models;

namespace WebApiProject.Services
{
    public interface IProductService
    {
        List<Product> GetAll();
        List<Product> GetProductsByCategory(int id);  
        ProductWithCategoryDTO  GetById(int id);
        ProductsPerPageDTO GetProductsPerPages(int page, int pageSize);
        void Add(Product product);
        void Update(Product product);
        void Delete(int id);
        int Save();

    }
}
