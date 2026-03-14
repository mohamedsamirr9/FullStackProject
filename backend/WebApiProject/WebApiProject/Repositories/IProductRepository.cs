using WebApiProject.Models;

namespace WebApiProject.Repositories
{
    public interface IProductRepository : IRepository<Product>
    {
        List<Product> GetProductsByCategory(int id);
        List<Product> GetProductsPerPages(int page, int pageSize);
        List<Product>  GetCategoryProductsPerPages (int id , int page, int pageSize);
        int GetTotalCount();
        int GetCategoryCount(int id);


    }
}
