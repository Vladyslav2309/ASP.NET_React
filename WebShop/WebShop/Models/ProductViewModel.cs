using System.ComponentModel.DataAnnotations;

namespace WebShop.Models
{
    public class ProductViewModel
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "The Name field is required.")]
        [StringLength(255, ErrorMessage = "The Name field must not exceed 255 characters.")]
        public string Name { get; set; }

        [Required(ErrorMessage = "The Price field is required.")]
        [Range(0, double.MaxValue, ErrorMessage = "The Price field must be a non-negative number.")]
        public decimal Price { get; set; }

        [StringLength(4000, ErrorMessage = "The Description field must not exceed 4000 characters.")]
        public string Description { get; set; }

        public int CategoryId { get; set; }
    }
}
