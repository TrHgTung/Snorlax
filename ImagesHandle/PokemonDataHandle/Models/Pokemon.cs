namespace PokemonDataHandle.Models
{
    public class Pokemon
    {
        public int Id { get; set; }
        public string PokemonName { get; set; }
        public string PokemonDescription { get; set; }
        public string PokemonFirstType { get; set; }
        public string? PokemonSecondType { get; set; }
        public string Region { get; set; }
        public string ImgPath { get; set; }

    }
}
