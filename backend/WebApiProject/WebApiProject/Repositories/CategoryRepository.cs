using Microsoft.EntityFrameworkCore;
using WebApiProject.Models;

namespace WebApiProject.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly AppDbContext context;

        public CategoryRepository(AppDbContext _context) {
            context  = _context;
        }
        public void Add(Category obj)
        {
            context.Categories.Add(obj);
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public List<Category> GetAll()
        {
            return context.Categories.ToList();
        }

        public Category GetById(int id)
        {
            return context.Categories
            .Include(c => c.Products)
            .FirstOrDefault(c => c.Id == id);
        }


        public int Save()
        {
            return context.SaveChanges();
        }

        public void Update(Category obj)
        {
            throw new NotImplementedException();
        }
    }
}
