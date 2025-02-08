import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles['navbar-container']}>
        <div className={styles['navbar-logo']}>
          <img
            src="/icons/chatbot-icon-white.svg"
            alt="Chatbot Icon"
            className={styles['navbar-logo-image']}
          />
        </div>
        <div className={styles['navbar-title']}>LSEG chatbot</div>
      </div>
    </nav>
  );
};

export default Navbar;
