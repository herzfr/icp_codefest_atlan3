import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Int "mo:base/Int";
import Bool "mo:base/Bool";
import Buffer "mo:base/Buffer";
import Nat64 "mo:base/Nat64";
import Principal "mo:base/Principal";
import None "mo:base/None";
import Array "mo:base/Array";

actor {
  type Course = {
    courseId: Text;
    name: Text;
    principal: Principal;
    certificate: [Certificate];
    createdAt: Nat64;
  };

  type Certificate = {
    licenseId: Text;
    name: Text;
    serialNumber: Text;
    expired: ?Nat64;
    isUsed: Bool;
    createdAt: Nat64;
  };

  private type PayloadCreateCertificate = {
    courseId: Text;
    name: Text;
    serialNumber: Text;
    expired: ?Nat64;
  };

  let certificates = Buffer.Buffer<Certificate>(10);
  let courses = Buffer.Buffer<Course>(10);


// Return the principal identifier that was provided as an installation
  // argument to this canister.
  public query func argument(someone : Principal) : async Principal {
    return someone;
  };

  // Return the principal identifier of the caller of this method.
  public shared query (msg) func whoami() : async Principal {
    msg.caller;
  };

  // // Return the principal identifier of this canister.
  // public func id() : async Principal {
  //   return await whoami();
  // };

  public shared ({caller}) func createCourse(names: Text): async Text {
    let id: Principal = await whoami();
      let course: Course = {
        courseId = "Text";
        name = names;
        principal = id;
        certificate = [];
        createdAt = 123;
      };
      courses.add(course);
      return course.courseId;
  };

  public query func getCourse() : async [Course] {
    return Buffer.toArray<Course>(courses);
  };

  public shared ({caller}) func createCertificate(payload: PayloadCreateCertificate): async Text {
    let certificate: Certificate = {
      licenseId = "Text";
      name = payload.name;
      serialNumber = payload.serialNumber;
      expired = payload.expired;
      isUsed = false;
      createdAt = 212;
    };
    certificates.add(certificate);
    return certificate.licenseId
  };

  public query func getCertificates() : async [Certificate] {
    return Buffer.toArray<Certificate>(certificates);
  };
}