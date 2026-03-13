using WebApiProject.DTOs;
using WebApiProject.Mapping;
using WebApiProject.Models;
using WebApiProject.Repositories;

namespace WebApiProject.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository categoryRepository;

        public CategoryService(ICategoryRepository _categoryRepository) {
            categoryRepository = _categoryRepository;
        }
        public void Add(Category category)
        {
            categoryRepository.Add(category);
        }

        public void Delete(Category category)
        {
            throw new NotImplementedException();
        }

        public List<Category> GetAll()
        {
            return categoryRepository.GetAll();
        }

        public CategoryWithProductsDTO GetById(int id)
        {
            var category = categoryRepository.GetById(id);
            return category.CategoryProductsMap();
        }

        public int Save()
        {
            return categoryRepository.Save();
        }

        public void Update(Category category)
        {
            throw new NotImplementedException();
        }
    }
}
