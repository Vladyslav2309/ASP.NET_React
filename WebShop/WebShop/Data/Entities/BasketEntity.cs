using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.Eventing.Reader;
using WebShop.Data.Entities.Identity;

namespace WebShop.Data.Entities
{
    [Table("tblBaskets")]
    public class BasketEntity
    {
        /// <summary>
        /// Кількість товару
        /// </summary>
        public int Quintity { get; set; }

        /// <summary>
        /// Користувач
        /// </summary>
        [ForeignKey("User")]
        public int UserId { get; set; }

        /// <summary>
        /// Продукт
        /// </summary>
        [ForeignKey("Product")]
        public int ProductId { get; set; }

        public virtual UserEntity User { get; set; }
        public virtual ProductEntity Product { get; set; }
    }
}
