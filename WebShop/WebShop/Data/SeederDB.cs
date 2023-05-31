using Microsoft.EntityFrameworkCore;

namespace WebShop.Data
{
    public static class SeederDB
    {
        public static void SeedData(this IApplicationBuilder app)
        {
            using (var scope=app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var service=scope.ServiceProvider;
                var context = service.GetRequiredService<AppEFContext>();
                context.Database.Migrate();
            }
        }
    }
}
