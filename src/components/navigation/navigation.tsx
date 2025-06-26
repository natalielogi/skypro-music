import Link from 'next/link';
import Image from 'next/image';

export default function Navigation() {
  return (
    <nav className={'main__nav'}>
      <div className={'nav__logo'}>
        <Image
          width={250}
          height={170}
          className={'logo__image'}
          src="/img/logo.png"
          alt={'logo'}
        />
      </div>
      <div className={'nav__burger'}>
        <span className={'burger__line'}></span>
        <span className={'burger__line'}></span>
        <span className={'burger__line'}></span>
      </div>
      <div className={'nav__menu'}>
        <ul className={'menu__list'}>
          <li className={'menu__item'}>
            <Link href="#" className={'menu__link'}>
              Главное
            </Link>
          </li>
          <li className={'menu__item'}>
            <Link href="#" className={'menu__link'}>
              Мой плейлист
            </Link>
          </li>
          <li className={'menu__item'}>
            <Link href="../signin.html" className={'menu__link'}>
              Войти
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
