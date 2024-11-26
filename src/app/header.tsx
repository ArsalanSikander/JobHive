import Link from "next/link";
import styles from './page.module.css'

const Header = () => {
    return (
        <div id={styles.header}>
            <p>Logo Here</p>
            <nav>
                <ul id={styles.navList}>
                    <li>
                        <Link href='/jobs'>Jobs</Link>
                    </li>
                    <li>
                        <Link href='/statistics'>Statistics</Link>
                    </li>
                    <li>
                        <Link href='/'>A link</Link>
                    </li>
                    <li>
                        <Link href='/'>A link</Link>
                    </li>
                </ul>
            </nav>
            <p>
                <Link href='/nlogin'>Login</Link>
            </p>
        </div>
    )
}

export default Header;