using FluentValidation;

namespace Application.Validators
{
    public static class ValidatorExtensions
    {
        public static IRuleBuilder<T, string> Password<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            var options = ruleBuilder.NotEmpty().MinimumLength(6).WithMessage("Password Must be at least 6 characters")
                                                .Matches("[A-Z]").WithMessage("Password MUST contian 1 uppercase letter")
                                                .Matches("[a-z]").WithMessage("Password MUST contian 1 lowercase letter")
                                                .Matches("[0-9]").WithMessage("Password MUST contian a number")
                                                .Matches("[^a-zA-Z0-9]").WithMessage("Password MUST contian a non alpha-numeric value");
            
            return options;

        }
    }
}