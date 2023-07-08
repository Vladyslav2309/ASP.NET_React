using System.ComponentModel.DataAnnotations.Schema;
using WebShop.Data.Entities.Identity;

namespace WebShop.Data.Entities
{
    public class OrderEntity
    {
        public int Id { get; set; }
        [ForeignKey("User")]
        public int UserId { get; set; }
        public decimal TotalPrice { get; set; }
        public DateTime DateCreated { get; set; }

        public virtual UserEntity User { get; set; }
        public virtual List<OrderProductEntity> OrderProducts { get; set; } = new List<OrderProductEntity>();

    }
}
