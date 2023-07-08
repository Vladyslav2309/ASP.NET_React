using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using WebShop.Data;
using WebShop.Data.Entities;
using WebShop.Models;

namespace WebShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly AppEFContext _appContext;
        private readonly IMapper _mapper;

        public OrdersController(AppEFContext appEFContext, IMapper mapper)
        {
            _appContext = appEFContext;
            _mapper = mapper;
        }

        [HttpPost("createOrder")]
        public async Task<IActionResult> CreateOrder(OrderCreateViewModel model)
        {
            // Проверка модели и других необходимых условий

            var order = new OrderEntity
            {
                UserId = model.UserId,
                DateCreated = DateTime.UtcNow
            };

            decimal totalPrice = 0;

            foreach (var productItem in model.Products)
            {
                var product = await _appContext.Products.FindAsync(productItem.ProductId);

                if (product == null)
                {
                    // Обработка ошибки: продукт не найден
                    return BadRequest("One or more products in the order are not found.");
                }

                var orderProduct = new OrderProductEntity
                {
                    ProductId = product.Id,
                    Quantity = productItem.Quantity,
                    Price = product.Price
                };

                order.OrderProducts.Add(orderProduct);
                totalPrice += product.Price * productItem.Quantity;
            }

            order.TotalPrice = totalPrice;

            _appContext.Orders.Add(order);
            await _appContext.SaveChangesAsync();

            var orderViewModel = _mapper.Map<OrderViewModel>(order);
            return Ok(orderViewModel);
        }

        [HttpGet("get/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            // Получение заказа по идентификатору
            var order = await _appContext.Orders
                .Include(o => o.UserId)
                .SingleOrDefaultAsync(o => o.Id == id);

            if (order == null)
                return NotFound("Заказ не найден");

            var orderViewModel = _mapper.Map<OrderViewModel>(order);
            return Ok(orderViewModel);
        }

        [HttpGet("list")]
        public IActionResult List()
        {
            // Получение списка всех заказов
            var orders = _appContext.Orders
                .Include(o => o.UserId)
                .Select(o => _mapper.Map<OrderViewModel>(o))
                .ToList();

            return Ok(orders);
        }
    }
}
