using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Drawing;
using WebShop.Data;
using WebShop.Data.Entities;
using WebShop.Helpers;
using WebShop.Models;

namespace WebShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly AppEFContext _appContext;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        public ProductsController(AppEFContext appEFContext, IConfiguration configuration, IMapper mapper)
        {
            _appContext = appEFContext;
            _configuration = configuration;
            _mapper = mapper;

        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            var product = await _appContext.Products
                .Include(p => p.ProductImages)
                .SingleOrDefaultAsync(p => p.Id == id);

            if (product == null)
                return NotFound();

            var productViewModel = _mapper.Map<ProductViewModel>(product);
            return Ok(productViewModel);
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateProduct([FromBody] ProductCreateViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var product = _mapper.Map<ProductEntity>(model);
            product.DateCreated = DateTime.UtcNow;

            _appContext.Products.Add(product);
            await _appContext.SaveChangesAsync();

            var productViewModel = _mapper.Map<ProductViewModel>(product);
            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, productViewModel);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, [FromBody] ProductUpdateViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var product = await _appContext.Products
                .SingleOrDefaultAsync(p => p.Id == id);

            if (product == null)
                return NotFound();

            _mapper.Map(model, product);
            await _appContext.SaveChangesAsync();

            var productViewModel = _mapper.Map<ProductViewModel>(product);
            return Ok(productViewModel);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _appContext.Products
                .SingleOrDefaultAsync(p => p.Id == id);

            if (product == null)
                return NotFound();

            _appContext.Products.Remove(product);
            await _appContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("uploadImage")]
        public async Task<IActionResult> UploadImage([FromForm] ProductUploadImageViewModel model)
        {

            string imageName = string.Empty;
            if (model.Image != null)
            {
                var fileExp = Path.GetExtension(model.Image.FileName);
                var dirSave = Path.Combine(Directory.GetCurrentDirectory(), "images");
                imageName = Path.GetRandomFileName() + fileExp;
                using (var ms = new MemoryStream())
                {
                    await model.Image.CopyToAsync(ms);
                    var bmp = new Bitmap(Image.FromStream(ms));
                    string[] sizes = ((string)_configuration.GetValue<string>("ImageSizes")).Split(" ");
                    foreach (var s in sizes)
                    {
                        int size = Convert.ToInt32(s);
                        var saveImage = ImageWorker.CompressImage(bmp, size, size, false);
                        saveImage.Save(Path.Combine(dirSave, s + "_" + imageName));
                    }
                }
                var entity = new ProductImageEntity();
                entity.Name = imageName;
                entity.DateCreated = DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc);
                _appContext.ProductImages.Add(entity);
                _appContext.SaveChanges();
                return Ok(_mapper.Map<ProductImageItemViewModel>(entity));

            }
            return BadRequest();
        }

        [HttpDelete("RemoveImage/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var image = await _appContext.ProductImages.SingleOrDefaultAsync(x => x.Id == id);
            if (image == null)
                return NotFound();

            var dirSave = Path.Combine("images");
            string[] sizes = ((string)_configuration.GetValue<string>("ImageSizes")).Split(" ");
            foreach (var s in sizes)
            {
                var imgDelete = Path.Combine(dirSave, s + "_" + image.Name);
                if (System.IO.File.Exists(imgDelete))
                {
                    System.IO.File.Delete(imgDelete);
                }
            }
            _appContext.ProductImages.Remove(image);
            await _appContext.SaveChangesAsync();
            return Ok();
        }

    }
}