using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebShop.Data.Entities
{
    [Table("tblCategories")]
    public class CategoryEntity
    {
        [Key]
        public int Id { get; set; }
        public bool IsDelete { get; set; }
        public DateTime DateCreated { get; set; }
        [Required, StringLength(255)]
        public string Name { get; set; }
        public int Priority { get; set; }
        [StringLength(255)]
        public string Image { get; set; }
        [StringLength(4000)]
        public string Description { get; set; }

        [ForeignKey("Parent")]
        public int? ParentId { get; set; }
        public virtual CategoryEntity Parent { get; set; }

        public virtual ICollection<CategoryEntity> Children { get; set; }
        public virtual ICollection<ProductEntity> Products { get; set; } 
    }
}