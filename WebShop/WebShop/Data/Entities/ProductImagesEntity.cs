using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace WebShop.Data.Entities
{
    [Table("tblProductImages")]
    public class ProductImageEntity
    {
        [Key]
        public int Id { get; set; }
        [Required, StringLength(255)]
        public string Name { get; set; }
        public int Priority { get; set; }
        public bool IsDelete { get; set; }
        public DateTime DateCreated { get; set; }

        [ForeignKey("Product")]
        public int? ProductId { get; set; }
        public virtual ProductEntity Product { get; set; }
    }
}
