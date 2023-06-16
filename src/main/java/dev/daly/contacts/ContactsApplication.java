package dev.daly.contacts;

import com.vaadin.flow.component.dependency.NpmPackage;
import com.vaadin.flow.component.page.AppShellConfigurator;
import com.vaadin.flow.server.PWA;
import com.vaadin.flow.theme.Theme;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
@Theme("contacts")
@PWA(
        name = "Contacts",
        shortName = "Contacts",
        offlinePath = "offline.html",
        offlineResources = {"images/offline.png"}
    )
public class ContactsApplication implements AppShellConfigurator {

    public static void main(String[] args) {
        SpringApplication.run(ContactsApplication.class, args);
    }

}
