using Microsoft.EntityFrameworkCore;
using WebApiProject.Models;

namespace WebApiProject.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly AppDbContext context;

        public ProductRepository(AppDbContext _context) {
            context = _context;
        }
        public void Add(Product obj)
        {
            context.Products.Add(obj);
        }

        public void Delete(int id)
        {
            Product product = GetById(id);
            context.Products.Remove(product);
        }

        public List<Product> GetAll()
        {
           return context.Products.ToList();
        }
        public List<Product> GetProductsPerPages(int page, int pageSize)
        {
           return context.Products.Skip((page-1)*pageSize).Take(pageSize).ToList();
        }
        public List<Product> GetProductsByCategory(int id)
        {
            return context.Products.Where(p =>  p.CategoryId == id).ToList();
        }

        public Product GetById(int id)
        {
            return context.Products.Include(p => p.Category).FirstOrDefault(p => p.Id == id);
        }

        public int Save()
        {
            return context.SaveChanges();
        }

        public void Update(Product obj)
        {
            Product product = GetById(obj.Id);
            product.Name = obj.Name;
            product.Description = obj.Description;
            product.Price = obj.Price;
            product.CategoryId = obj.CategoryId;
        }

        public int GetTotalCount()
        {        
            return context.Products.Count();
        }
    }
}
