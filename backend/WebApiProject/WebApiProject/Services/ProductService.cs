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
        public void Add(ProductAdminDTO productAdminDTO)
        {
            string? imageUrl = null;
            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(productAdminDTO.imageUrl.FileName)}"; 
            var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images/products");
            var path = Path.Combine(folderPath, fileName);

            using var stream = new FileStream(path, FileMode.Create);
            productAdminDTO.imageUrl.CopyTo(stream);
            imageUrl = $"/images/products/{fileName}";
            var product = productAdminDTO.toAdminProduct(imageUrl);
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

        public void Update(ProductAdminDTO productAdminDTO,int Id)
        {
           var product =  _productRepository.GetById(Id);
            string? imageUrl = null;
            if (productAdminDTO.imageUrl != null)
            {
                var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images/products");
                if (!string.IsNullOrEmpty(product.imageUrl))
                {
                    var oldImagePath = Path.Combine(
                        Directory.GetCurrentDirectory(),
                        "wwwroot",
                        product.imageUrl.TrimStart('/')
                    );

                    if (File.Exists(oldImagePath))
                        File.Delete(oldImagePath);
                }
                var fileName = $"{Guid.NewGuid()}{Path.GetExtension(productAdminDTO.imageUrl.FileName)}";
                var newPath = Path.Combine(folderPath, fileName);

                if (!Directory.Exists(folderPath))
                    Directory.CreateDirectory(folderPath);

                using var stream = new FileStream(newPath, FileMode.Create);
                productAdminDTO.imageUrl.CopyTo(stream);

                imageUrl = $"/images/products/{fileName}";
            }

            product.UpdateFromDto(productAdminDTO, imageUrl);
            _productRepository.Update(product);
        }
    }
}
