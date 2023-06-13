package dev.daly.contacts.data;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ContactService {

    private final ContactRepository contactRepository;


    public List<Contact> findAllContacts(String filterText){
        if(filterText == null || filterText.isEmpty())
            return contactRepository.findAll();
        return contactRepository.findContactsByNameContains(filterText);
    }

    public Long countContacts(){
        return contactRepository.count();
    }

    public void deleteContact(Contact contact){
        contactRepository.delete(contact);
    }

    public void saveContact(Contact contact){
        if(contact == null){
            System.err.println("Contact is null");
            return;
        }
        contactRepository.save(contact);
    }


    public Contact getContactById(Long id){
        return contactRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Contact not found"));
    }

    public void removeContact(Long id){
        contactRepository.deleteById(id);
    }

    public void createContact(String firstName, String lastName, int age, String phone) {
        contactRepository.save(new Contact(firstName, lastName, age, phone));
    }

    public void updateContact(Contact contact) {
        contactRepository.save(contact);
    }



}
