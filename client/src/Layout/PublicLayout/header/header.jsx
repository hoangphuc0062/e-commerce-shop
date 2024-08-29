import icons from "../../../ultils/icon";
import { SearchInput } from "../../../components/Input/SearchInput";

const { AiOutlineSearch, AiOutlineHeart, AiOutlineShoppingCart } = icons;

function Header() {
  return (
    <header class="flex items-center justify-between p-4 bg-background">
      <h1 class="text-2xl font-bold text-primary">Voi Tây Nguyên</h1>
      {/* <nav class="flex space-x-4">
        <a href="#" class="text-dark hover:text-muted-foreground">
          Trang chủ
        </a>
        <a href="#" class="text-dark hover:text-muted-foreground">
          Sản phẩm
        </a>
        <a href="#" class="text-dark hover:text-muted-foreground">
          Về chúng tôi
        </a>
      </nav> */}

      <SearchInput />
    </header>
  );
}

export default Header;
