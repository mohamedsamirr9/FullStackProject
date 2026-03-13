using Bogus;
using WebApiProject.Models;

public static class DbSeeder
{
    public static void Seed(AppDbContext context)
    {

        // Seed Categories أولاً
        if (!context.Categories.Any())
        {
            var categories = new List<Category>
        {
            new Category { Name = "Electronics" },
            new Category { Name = "Books" },
            new Category { Name = "Clothing" },
            new Category { Name = "Toys" }
        };
            context.Categories.AddRange(categories);
            context.SaveChanges();
        }



        var categoryIds = context.Categories.Select(c => c.Id).ToList();

        // Seed Products
        var faker = new Faker<Product>()
            .RuleFor(p => p.Name, f => f.Commerce.ProductName())
            .RuleFor(p => p.Description, f => f.Commerce.ProductDescription())
            .RuleFor(p => p.Price, f => decimal.Parse(f.Commerce.Price(10, 500)))
            .RuleFor(p => p.Quantity, f => f.Random.Int(1, 20))
            .RuleFor(p => p.imageUrl, f => $"https://picsum.photos/200/200?random={f.IndexFaker}")
            .RuleFor(p => p.CategoryId, f => f.PickRandom(categoryIds));

        context.Products.AddRange(faker.Generate(50));
        context.SaveChanges();
    }
}