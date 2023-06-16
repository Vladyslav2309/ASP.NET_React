namespace WebShop.Models.Auth
{
    public class LoginViewModel
    {
        /// <summary>
        /// Електронна пошта
        /// </summary>
        /// <example>korolov2309@gmail.com</example>
        public string Email { get; set; }
        /// <summary>
        /// Пароль
        /// </summary>
        /// <example>123456</example>
        public string Password { get; set; }
    }
}