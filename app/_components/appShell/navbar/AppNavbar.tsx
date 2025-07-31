import { useMemo, useState } from "react";
import {
  Icon2fa,
  IconBellRinging,
  IconDatabaseImport,
  IconFileAnalytics,
  IconFingerprint,
  IconKey,
  IconLicense,
  IconLogout,
  IconMessage2,
  IconMessages,
  IconReceipt2,
  IconReceiptRefund,
  IconSettings,
  IconShoppingCart,
  IconSwitchHorizontal,
  IconUsers,
} from "@tabler/icons-react";
import classes from "./AppNavbar.module.css";
import { useTranslations } from "next-intl";
import { Box } from "@mantine/core";

export function MainNavbar() {
  const [active, setActive] = useState("Billing");
  const t = useTranslations("Navigation");

  const tabs = useMemo(() => ({
    account: [
      { link: "", label: t("notifications"), icon: IconBellRinging },
      { link: "", label: t("billing"), icon: IconReceipt2 },
      { link: "", label: t("security"), icon: IconFingerprint },
      { link: "", label: t("ssh_keys"), icon: IconKey },
      { link: "", label: t("databases"), icon: IconDatabaseImport },
      { link: "", label: t("authentication"), icon: Icon2fa },
      { link: "", label: t("other_settings"), icon: IconSettings },
    ],
  }), [t]);

  const links = tabs["account"].map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>{links}</div>

      <div className={classes.footer}>
        <Box component="a" href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </Box>

        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}
