using System.ComponentModel.DataAnnotations;

namespace WebShop.Models
{
    public class ProductCreateViewModel
    {
        [Required(ErrorMessage = "Обов'язкове поле")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Обов'язкове поле")]
        [Range(0.01, double.MaxValue, ErrorMessage = "Ціна не може бути 0")]
        public decimal Price { get; set; }

        public string Description { get; set; }

        [Required(ErrorMessage = "Обов'язкове поле")]
        public int CategoryId { get; set; }
    }
}
