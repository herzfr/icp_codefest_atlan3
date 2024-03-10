import Text "mo:base/Text";
import Int "mo:base/Int";
import Bool "mo:base/Bool";
import Buffer "mo:base/Buffer";
import Nat64 "mo:base/Nat64";
import Principal "mo:base/Principal";
import Array "mo:base/Array";
import Time "mo:base/Time";
import Nat32 "mo:base/Nat32";


actor {
  type Course = {
    courseId: Nat32;
    name: Text;
    principal: Principal;
    certificate: [Certificate];
    createdAt: Int;
  };

  type Certificate = {
    certificateId: Nat32;
    name: Text;
    serialNumber: Text;
    expired: ?Nat64;
    isUsed: Bool;
    createdAt: Int;
  };

  private type PayloadCreateCertificate = {
    courseId: Nat32;
    name: Text;
    serialNumber: Text;
    expired: ?Nat64;
  };

  private type PayloadCheckCertificate = {
    courseId: Nat32;
    serialNumber: Text;
  };

  let certificates = Buffer.Buffer<Certificate>(10);
  let courses = Buffer.Buffer<Course>(10);

  stable var lastId : Nat32 = 0;

  public shared ({caller}) func createCourse(names: Text): async Text {
    try {
      let id: Principal = await whoami();
      let now = Time.now();
      let newCourse: Course = {
        courseId = nextId();
        name = names;
        principal = id;
        certificate = [];
        createdAt = now;
      };
      courses.add(newCourse);
      return "Success";
    } catch(err) {
      return "Error While registering Course";
    }
  };

  public query func getCourse() : async [Course] {
    let coursesList = Buffer.toArray<Course>(courses);
    let coursesListSize = Array.size(coursesList);
    if (coursesListSize == 0) {
      return [];
    };
    return coursesList;
  };

  public shared ({caller}) func createCertificate(payload: PayloadCreateCertificate): async Text {

    let isCourseIdExist: ?Course = await getCourseById(payload.courseId);
    if (isCourseIdExist == null) {
      return "Course Does'n Exist"
    };

    let duplicatedCertificate: ?Certificate = await getCertificateBySerialNumber(payload.serialNumber);
    if(duplicatedCertificate != null) {
       return "Your Certificate serial number already created before";
    };

    let now = Time.now();
    let newCertificate: Certificate = {
      certificateId = nextId();
      name = payload.name;
      serialNumber = payload.serialNumber;
      expired = payload.expired;
      isUsed = true;
      createdAt = now;
    };
    certificates.add(newCertificate);
    // updateCourse(payload.courseId, newCertificate);
    return "Success"
  };

  // shared ({caller}) func updateCourse(courseId: Nat32, dataCertificate: Certificate) {
  //   let isCourseIdExist = await getCourseById(courseId);
  //   isCourseIdExist.certificate.add(dataCertificate);
  // };

  public query func getCertificates() : async [Certificate] {
    let certificateList = Buffer.toArray<Certificate>(certificates);
    let certificateSize = Array.size(certificateList);
    if (certificateSize == 0) {
      return [];
    };
    return certificateList;
  };

  // validate certificate
  public shared ({caller}) func checkCertificate(payload: PayloadCheckCertificate) : async Text {
    let isCourseIdExist: ?Course = await getCourseById(payload.courseId);
    if (isCourseIdExist == null) {
      return "Course Does'n Exist"
    };

    let duplicatedCertificate: ?Certificate = await getCertificateBySerialNumber(payload.serialNumber);
    if(duplicatedCertificate != null) {
       return "Your Certificate verified";
    };

    return ""
  };

  // find course by Id
  public query func getCourseById(id: Nat32): async ?Course {
    let coursesList = Buffer.toArray<Course>(courses);
    let coursesListSize = Array.size(coursesList);
    if (coursesListSize == 0) {
      return null;
    };
    let findId = Array.find<Course>(coursesList, func x = x.courseId == id);
    return findId
  };

  // find certificate by serialNumber
  public query func getCertificateBySerialNumber(number: Text): async ?Certificate {
    let certificateList = Buffer.toArray<Certificate>(certificates);
    let certificateListSize = Array.size(certificateList);
    if (certificateListSize == 0) {
      return null;
    };
    let findSerialNumber = Array.find<Certificate>(certificateList, func x = x.serialNumber == number);
    return findSerialNumber
  };

  // Return the principal identifier that was provided as an installation
  // argument to this canister.
  public query func argument(someone : Principal) : async Principal {
    return someone;
  };

  // Return the principal identifier of the caller of this method.
  public shared query (msg) func whoami() : async Principal {
    msg.caller;
  };

  public query func getRandomId(): async Nat32 {
    return nextId()
  };

  private func nextId() : Nat32 {
        lastId += 1;
        lastId;
    };

};