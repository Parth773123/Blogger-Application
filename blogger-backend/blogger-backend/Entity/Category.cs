using System.ComponentModel.DataAnnotations.Schema;

namespace blogger_backend.Entity
{
    [Table("Categories")]
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
