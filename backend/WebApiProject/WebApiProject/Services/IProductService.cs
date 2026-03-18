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
        ProductsPerPageDTO GetCategoryProductsPerPage(int id, int page, int pageSize);
        ProductsPerPageDTO SearchByName(string name, int page, int pageSize);
        void Add(ProductAdminDTO productAdminDTO);
        void Update(ProductAdminDTO productAdminDTO, int Id);
        void Delete(int id);
        int Save();

    }
}
