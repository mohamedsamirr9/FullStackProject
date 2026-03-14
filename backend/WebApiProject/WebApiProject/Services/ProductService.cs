using WebApiProject.DTOs;
using WebApiProject.Mapping;
using WebApiProject.Models;
using WebApiProject.Repositories;

namespace WebApiProject.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;

        public ProductService(IProductRepository productRepository) {
            _productRepository = productRepository;
        }
        public void Add(Product product)
        {
            _productRepository.Add(product);
        }

        public void Delete(int id)
        {
            _productRepository.Delete(id);
        }

        public List<Product> GetAll()
        {
            return _productRepository.GetAll();
        }
        public ProductsPerPageDTO GetProductsPerPages(int page, int pageSize) { 
            
                var products =  _productRepository.GetProductsPerPages(page,pageSize);
            int total = _productRepository.GetTotalCount();
            return products.toProductsPerPage(page,pageSize,total);
        }
        public ProductsPerPageDTO GetCategoryProductsPerPage(int id,int page , int pageSize)
        {
            var products = _productRepository.GetCategoryProductsPerPages(id,page,pageSize);
            var total = _productRepository.GetCategoryCount(id);
            return products.toProductsPerPage(page,pageSize,total);
        }
        public ProductsPerPageDTO SearchByName(string name, int page, int pageSize)
        {
            var products = _productRepository.SearchByProductName(name,page,pageSize);
            var total = _productRepository.GetSearchCount(name);
            return products.toProductsPerPage(page,pageSize,total);

        }
        public ProductWithCategoryDTO GetById(int id)
        {
            var product = _productRepository.GetById(id);
            return product.productCategory();
        }

        public List<Product> GetProductsByCategory(int id)
        {
           return _productRepository.GetProductsByCategory(id);
        }

        public int Save()
        {
            return _productRepository.Save();
        }

        public void Update(Product product)
        {
            _productRepository.Update(product);
        }
    }
}
