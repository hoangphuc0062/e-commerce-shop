import icons from "../../../ultils/icon";

const { AiOutlineSearch, AiOutlineHeart, AiOutlineShoppingCart } = icons;

function Header() {
  return (
    <header class="flex items-center justify-between p-4 bg-background">
      <h1 class="text-2xl font-bold text-primary">Voi Tây Nguyên</h1>
      <nav class="flex space-x-4">
        <a href="#" class="text-dark hover:text-muted-foreground">
          Trang chủ
        </a>
        <a href="#" class="text-dark hover:text-muted-foreground">
          Sản phẩm
        </a>
        <a href="#" class="text-dark hover:text-muted-foreground">
          Về chúng tôi
        </a>
        <a href="#" class="text-dark hover:text-muted-foreground">
          Đăng nhập / Đăng ký
        </a>
      </nav>
      <div class="flex items-center space-x-2 border-border">
        <input
          type="text"
          placeholder="What are you looking for?"
          class="p-2 border-none focus:outline-none rounded-md bg-input text-muted-foreground"
        />
        <button class="p-2 text-muted hover:text-muted-foreground">
          <AiOutlineSearch />
        </button>
        <button class="p-2 text-muted hover:text-muted-foreground">
          <AiOutlineHeart />
        </button>
        <button class="p-2 text-muted hover:text-muted-foreground">
          <AiOutlineShoppingCart />
        </button>
      </div>
    </header>
  );
}

export default Header;
