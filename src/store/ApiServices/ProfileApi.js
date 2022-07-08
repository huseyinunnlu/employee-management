import { defineStore } from "pinia";
import router from "@/router";
import appAxios from "@/core/services/Api/AppAxios";
import { useProfileStore } from "../Profile";

export const useProfileApi = defineStore("profileApi", {
  actions: {
    fetchProfile(slug) {
      const profileStore = useProfileStore();
      return new Promise((resolve, reject) => {
        appAxios.get(`profile/${slug}`).then((response) => {
          if (response.data) {
            profileStore.profile = response.data.data;
            resolve("Success");
          } else {
            reject("Error");
          }
        });
      });
    },
    updateEmail(id, email) {
      const profileStore = useProfileStore();
      return new Promise((resolve, reject) => {
        appAxios
          .put(`profile/${id}/updateemail`, { email: email })
          .then((response) => {
            if (response.data) {
              profileStore.profile.contact_info.email = response.data.email;
              resolve("Success");
            } else {
              reject("Error");
            }
          });
      });
    },
    updatePassword(id, form) {
      return new Promise((resolve, reject) => {
        appAxios.put(`/profile/${id}/updatepassword`, form).then((response) => {
          if (response.data) {
            resolve("success");
          } else {
            reject("error");
          }
        });
      });
    },
    updatePersonalInfo(id, form) {
      const profileStore = useProfileStore();
      return new Promise((resolve, reject) => {
        appAxios
          .put(`profile/${id}/updatepersonalinfo`, form)
          .then((response) => {
            if (response.data) {
              profileStore.profile = response.data.data;
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },
    addEmergencyContact(id, form) {
      const profileStore = useProfileStore();
      return new Promise((resolve, reject) => {
        appAxios
          .post(`profile/${id}/emergencycontact`, form)
          .then((response) => {
            if (response.data) {
              profileStore.profile["emergency_contact"].unshift(
                response.data.data
              );
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },
    deleteEmergencyContact(id, itemId) {
      const profileStore = useProfileStore();
      return new Promise((resolve, reject) => {
        appAxios
          .delete(`profile/${id}/emergencycontact/${itemId}`)
          .then((response) => {
            if (response.data) {
              const index = profileStore.profile["emergency_contact"].findIndex(
                (item) => item.id == itemId
              );
              profileStore.profile["emergency_contact"].splice(index, 1);
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },
    addEducationInfo(id, form) {
      const formData = new FormData();
      Object.entries(form).forEach((item) => {
        item[1] ? formData.append(item[0], item[1]) : "";
      });

      const profileStore = useProfileStore();
      return new Promise((resolve, reject) => {
        appAxios
          .post(`profile/${id}/educationinfo`, formData)
          .then((response) => {
            if (response.data) {
              profileStore.profile["education_info"].unshift(
                response.data.data
              );
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },

    deleteEducationInfo(id, itemId) {
      const profileStore = useProfileStore();
      return new Promise((resolve, reject) => {
        appAxios
          .delete(`profile/${id}/educationinfo/${itemId}`)
          .then((response) => {
            if (response.data) {
              const index = profileStore.profile["education_info"].findIndex(
                (item) => item.id == itemId
              );
              profileStore.profile["education_info"].splice(index, 1);
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },

    updateEducationInfo(id, itemId, form) {
      const profileStore = useProfileStore();
      return new Promise((resolve, reject) => {
        appAxios
          .put(`profile/${id}/educationinfo/${itemId}`, form)
          .then((response) => {
            if (response.data) {
              const index = profileStore.profile["education_info"].findIndex(
                (item) => item.id == itemId
              );
              profileStore.profile["education_info"][index] =
                response.data.data;
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },

    addCertificate(id, form) {
      const profileStore = useProfileStore();
      return new Promise((resolve, reject) => {
        appAxios.post(`profile/${id}/certificate`, form).then((response) => {
          if (response.data) {
            profileStore.profile["certificate"].unshift(response.data.data);
            resolve("success");
          } else {
            reject("error");
          }
        });
      });
    },

    deleteCertificate(id, itemId) {
      const profileStore = useProfileStore();
      return new Promise((resolve, reject) => {
        appAxios
          .delete(`profile/${id}/certificate/${itemId}`)
          .then((response) => {
            if (response.data) {
              const index = profileStore.profile["certificate"].findIndex(
                (item) => item.id == itemId
              );
              profileStore.profile["certificate"].splice(index, 1);
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },

    updateCertificate(id, itemId, form) {
      const profileStore = useProfileStore();
      return new Promise((resolve, reject) => {
        appAxios
          .put(`profile/${id}/certificate/${itemId}`, form)
          .then((response) => {
            if (response.data) {
              const index = profileStore.profile["certificate"].findIndex(
                (item) => item.id == itemId
              );
              profileStore.profile["certificate"][index] = response.data.data;
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },
    addForeignLanguage(id, form) {
      const profileStore = useProfileStore();
      return new Promise((resolve, reject) => {
        appAxios
          .post(`profile/${id}/foreignlanguage`, form)
          .then((response) => {
            if (response.data) {
              profileStore.profile["foreign_language"].unshift(
                response.data.data
              );
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },
    deleteForeignLanguage(id, itemId) {
      const profileStore = useProfileStore();
      return new Promise((resolve, reject) => {
        appAxios
          .delete(`profile/${id}/foreignlanguage/${itemId}`)
          .then((response) => {
            if (response.data) {
              const index = profileStore.profile["foreign_language"].findIndex(
                (item) => item.id == itemId
              );
              profileStore.profile["foreign_language"].splice(index, 1);
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },
    updateForeignLanguage(id, itemId, form) {
      const profileStore = useProfileStore();
      return new Promise((resolve, reject) => {
        appAxios
          .put(`profile/${id}/foreignlanguage/${itemId}`, form)
          .then((response) => {
            if (response.data) {
              const index = profileStore.profile["foreign_language"].findIndex(
                (item) => item.id == itemId
              );
              profileStore.profile["foreign_language"][index] =
                response.data.data;
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },
    addWorkExperience(id, form) {
      const profileStore = useProfileStore();
      return new Promise((resolve, reject) => {
        appAxios.post(`profile/${id}/workexperience`, form).then((response) => {
          if (response.data) {
            profileStore.profile["work_experience"].unshift(response.data.data);
            resolve("success");
          } else {
            reject("error");
          }
        });
      });
    },
    deleteWorkExperience(id, itemId) {
      const profileStore = useProfileStore();
      return new Promise((resolve, reject) => {
        appAxios
          .delete(`profile/${id}/workexperience/${itemId}`)
          .then((response) => {
            if (response.data) {
              const index = profileStore.profile["work_experience"].findIndex(
                (item) => item.id == itemId
              );
              profileStore.profile["work_experience"].splice(index, 1);
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },
    updateWorkExperience(id, itemId, form) {
      const profileStore = useProfileStore();
      return new Promise((resolve, reject) => {
        appAxios
          .put(`profile/${id}/workexperience/${itemId}`, form)
          .then((response) => {
            if (response.data) {
              const index = profileStore.profile["work_experience"].findIndex(
                (item) => item.id == itemId
              );
              profileStore.profile["work_experience"][index] =
                response.data.data;
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },
    addReference(id, form) {
      const profileStore = useProfileStore();
      return new Promise((resolve, reject) => {
        appAxios.post(`profile/${id}/reference`, form).then((response) => {
          if (response.data) {
            profileStore.profile["reference"].unshift(response.data.data);
            resolve("success");
          } else {
            reject("error");
          }
        });
      });
    },
    deleteReference(id, itemId) {
      const profileStore = useProfileStore();
      return new Promise((resolve, reject) => {
        appAxios
          .delete(`profile/${id}/reference/${itemId}`)
          .then((response) => {
            if (response.data) {
              const index = profileStore.profile["reference"].findIndex(
                (item) => item.id == itemId
              );
              profileStore.profile["reference"].splice(index, 1);
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },
    updateReference(id, itemId, form) {
      const profileStore = useProfileStore();
      return new Promise((resolve, reject) => {
        appAxios
          .put(`profile/${id}/reference/${itemId}`, form)
          .then((response) => {
            if (response.data) {
              const index = profileStore.profile["reference"].findIndex(
                (item) => item.id == itemId
              );
              profileStore.profile["reference"][index] = response.data.data;
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },
    addDebit(id, form) {
      const formData = new FormData();
      Object.entries(form).forEach((item) => {
        item[1] ? formData.append(item[0], item[1]) : "";
      });
      const profileStore = useProfileStore();
      return new Promise((resolve, reject) => {
        appAxios.post(`profile/${id}/debit`, formData).then((response) => {
          if (response.data) {
            profileStore.createData(response.data.data, "debits");
            resolve("success");
          } else {
            reject("error");
          }
        });
      });
    },
    getDebits(id) {
      const profileStore = useProfileStore();
      return new Promise((resolve, reject) => {
        appAxios.get(`profile/${id}/debit`).then((response) => {
          if (response.data) {
            profileStore.setData(response.data.data, "debits");
            resolve("success");
          } else {
            reject("error");
          }
        });
      });
    },

    deleteDebit(id, itemId) {
      const profileStore = useProfileStore();
      return new Promise((resolve, reject) => {
        appAxios.delete(`profile/${id}/debit/${itemId}`).then((response) => {
          if (response.data) {
            profileStore.deleteData(itemId, "debits");
            resolve("success");
          } else {
            reject("error");
          }
        });
      });
    },

    updateDebit(profileId, itemId, form) {
      const formData = new FormData();
      Object.entries(form).forEach((item) => {
        item[1] ? formData.append(item[0], item[1]) : "";
      });

      const profileStore = useProfileStore();
      return new Promise((resolve, reject) => {
        appAxios
          .post(`profile/${profileId}/debit/${itemId}?_method=PUT`, formData)
          .then((response) => {
            if (response.data) {
              profileStore.updateData(response.data.data, "debits");
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },
    getDocuments(id) {
      const profileStore = useProfileStore();
      return new Promise((resolve, reject) => {
        appAxios.get(`profile/${id}/document`).then((response) => {
          if (response.data) {
            profileStore.setData(response.data.data, "documents");
            resolve("success");
          } else {
            reject("error");
          }
        });
      });
    },
    addDocument(id, form) {
      const profileStore = useProfileStore();

      const formData = new FormData();
      Object.entries(form).forEach((item) => {
        item[1] != null ? formData.append(item[0], item[1]) : "";
      });
      return new Promise((resolve, reject) => {
        appAxios.post(`profile/${id}/document`, formData).then((response) => {
          if (response.data) {
            profileStore.createData(response.data.data, "documents");
            resolve("success");
          } else {
            reject("error");
          }
        });
      });
    },
    updateDocument(id, itemId, form) {
      const profileStore = useProfileStore();

      const formData = new FormData();
      Object.entries(form).forEach((item) => {
        item[1] != null ? formData.append(item[0], item[1]) : "";
      });
      return new Promise((resolve, reject) => {
        appAxios
          .post(`profile/${id}/document/${itemId}?_method=PUT`, formData)
          .then((response) => {
            if (response.data) {
              profileStore.updateData(response.data.data, "documents");
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },
    deleteDocument(id, itemId) {
      const profileStore = useProfileStore();
      return new Promise((resolve, reject) => {
        appAxios.delete(`profile/${id}/document/${itemId}`).then((response) => {
          if (response.data) {
            profileStore.deleteData(itemId, "documents");
            resolve("success");
          } else {
            reject("error");
          }
        });
      });
    },
    addAbsence(id, form) {
      const profileStore = useProfileStore();
      return new Promise((resolve, reject) => {
        appAxios.post(`profile/${id}/absence`, form).then((response) => {
          if (response.data) {
            profileStore.absenceStats.remaining =
              profileStore.absenceStats.remaining -
              response.data.data.day_count;
            profileStore.absenceStats.used =
              profileStore.absenceStats.deserved -
              profileStore.absenceStats.remaining;
            profileStore.createData(response.data.data, "absences");
            resolve("success");
          } else {
            reject("error");
          }
        });
      });
    },
    getAbsences(id) {
      const profileStore = useProfileStore();
      return new Promise((resolve, reject) => {
        appAxios.get(`profile/${id}/absence`).then((response) => {
          if (response.data) {
            profileStore.setData(response.data.data, "absences");
            profileStore.setData(response.data.stats, "absenceStats");
            resolve("success");
          } else {
            reject("error");
          }
        });
      });
    },
    deleteAbsence(id, itemId) {
      const profileStore = useProfileStore();
      return new Promise((resolve, reject) => {
        appAxios.delete(`profile/${id}/absence/${itemId}`).then((response) => {
          if (response.data) {
            profileStore.absenceStats.remaining =
              profileStore.absenceStats.remaining +
              response.data.data.absence_count;
            profileStore.absenceStats.used -= response.data.data.absence_count;
            profileStore.deleteData(itemId, "absences");
            resolve("success");
          } else {
            reject("error");
          }
        });
      });
    },
    updateAbsence(id, itemId, form) {
      const profileStore = useProfileStore();
      return new Promise((resolve, reject) => {
        appAxios
          .put(`profile/${id}/absence/${itemId}`, form)
          .then((response) => {
            if (response.data) {
              profileStore.updateAbsence(response.data.data, "absences");
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },
    getReports(id) {
      const profileStore = useProfileStore();
      return new Promise((resolve, reject) => {
        appAxios.get(`profile/${id}/report`).then((response) => {
          if (response.data) {
            profileStore.setData(response.data.data, "reports");
            resolve("success");
          } else {
            reject("error");
          }
        });
      });
    },
    addReport(id, form) {
      const profileStore = useProfileStore();

      const formData = new FormData();
      Object.entries(form).forEach((item) => {
        item[1] != null ? formData.append(item[0], item[1]) : "";
      });
      return new Promise((resolve, reject) => {
        appAxios.post(`profile/${id}/report`, formData).then((response) => {
          if (response.data) {
            profileStore.createData(response.data.data, "reports");
            resolve("success");
          } else {
            reject("error");
          }
        });
      });
    },
    updateReport(id, itemId, form) {
      const profileStore = useProfileStore();

      const formData = new FormData();
      Object.entries(form).forEach((item) => {
        item[1] != null ? formData.append(item[0], item[1]) : "";
      });
      return new Promise((resolve, reject) => {
        appAxios
          .post(`profile/${id}/report/${itemId}?_method=PUT`, formData)
          .then((response) => {
            if (response.data) {
              profileStore.updateData(response.data.data, "reports");
              resolve("success");
            } else {
              reject("error");
            }
          });
      });
    },
    deleteReport(id, itemId) {
      const profileStore = useProfileStore();
      return new Promise((resolve, reject) => {
        appAxios.delete(`profile/${id}/report/${itemId}`).then((response) => {
          if (response.data) {
            profileStore.deleteData(itemId, "reports");
            resolve("success");
          } else {
            reject("error");
          }
        });
      });
    },
  },
});
