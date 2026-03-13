namespace WebApiProject.Repositories
{
    public interface IRepository<T>
    {
        List<T> GetAll();
        T GetById(int id);
        void Add(T obj);
        void Delete(int id);
        void Update(T obj);
        int Save();

    }
}
