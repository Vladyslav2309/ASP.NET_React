using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace WebShop.Data.Entities
{
    [Table("tbProductImages")]
    public class ProductImagesEntity
    {
        [Key]
        public int Id { get; set; }
        public int ProductId { get; set; }
        [Required, StringLength(255)]
        public string Name { get; set; }
        public int Priority { get; set; }
    }
}
