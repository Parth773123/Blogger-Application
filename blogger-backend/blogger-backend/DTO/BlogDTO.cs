namespace blogger_backend.DTO
{
    public class BlogDTO
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public bool IsFeatured { get; set; }
        public int CategoryId { get; set; }
    }
}
