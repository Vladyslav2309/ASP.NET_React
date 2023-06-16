using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
namespace WebShop.Data.Entities
{
    [Table("tblProduct")]
    public class ProductEntity
    {
        [Key]
        public int Id { get; set; }
        public int CategoryId { get; set; }
        [Required, StringLength(255)]
        public string Name { get; set; }
        [StringLength(4000)]
        public decimal Price { get; set; }
        [StringLength(4000)]
        public string Description { get; set; }

    }
}
