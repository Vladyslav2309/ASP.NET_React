namespace WebShop.Models.Auth
{
    public class LoginViewModel
    {
        /// <summary>
        /// Електронна пошта
        /// </summary>
        /// <example>novakvova@gmail.com</example>
        public string Email { get; set; }
        /// <summary>
        /// Пароль
        /// </summary>
        /// <example>Qwerty1-</example>
        public string Password { get; set; }
    }
}