using WebApiProject.DTOs;
using WebApiProject.Models;

namespace WebApiProject.Services
{
    public interface ICategoryService
    {
        List<Category> GetAll();
        CategoryWithProductsDTO GetById(int id);
        void Add(Category category);
        void Update(Category category);
        void Delete(Category category);
        int Save();
    }
}
