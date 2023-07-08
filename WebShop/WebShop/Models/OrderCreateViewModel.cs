namespace WebShop.Models
{
    public class OrderCreateViewModel
    {
        public int UserId { get; set; }
        public List<OrderProductItemViewModel> Products { get; set; }
    }
}
