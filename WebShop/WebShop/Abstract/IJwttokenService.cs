using WebShop.Data.Entities.Identity;

namespace WebShop.Abstract
{
    public interface IJwttokenService
    {
        Task<string> CreateToken(UserEntity user);
    }
}
