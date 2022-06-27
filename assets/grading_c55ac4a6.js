angular.module("udacity.grading", ["angular-storage", "ui.bootstrap", "ui.codemirror", "ui.router", "udacity.templates", "udacity.common", "udacity.auth", "udacity.submissions", "udacity.projects", "hc.marked", "ui.select", "pascalprecht.translate"]).config(["$httpProvider", "$locationProvider", "$sceProvider", "markedProvider", function(e, t, i, n) {
        t.hashPrefix("!"), e.interceptors.push("AuthInterceptor"), e.interceptors.push("TermsNotAcceptedInterceptor"), n.setOptions({
            gfm: !0
        }), i.enabled(!1)
    }]).config(["$translateProvider", function(e) {
        e.registerAvailableLanguageKeys(["en-us", "es", "pt-br", "zh-cn"], {
            "en*": "en-us",
            "es*": "es",
            "pt*": "pt-br",
            "zh*": "zh-cn",
            "*": "en-us"
        }).useStaticFilesLoader({
            prefix: "/translations/",
            suffix: ".json"
        }).preferredLanguage("en-us").fallbackLanguage("en-us").useSanitizeValueStrategy("sce")
    }]).controller("MainCtrl", ["$rootScope", "$window", "$location", "$translate", "store", "UsersModel", "PageContextProvider", "LanguageService", function(t, e, i, n, r, a, o, s) {
        this.pageContext = o, this.logout = function() {
            AuthenticationService.clear(), e.location.replace("http://www.udacity.com")
        }, t._ = _, a.fetch().then(function(e) {
            e = e.data;
            t.isGrader = !(!e || !_.includes(["grader", "staff"], e.role)), t.isStaff = !(!e || !_.includes(["staff"], e.role))
        }), s.setUserLanguage()
    }]).run(["IdentificationService", function(e) {
        return e.ensureIdentified()
    }]).run(["$rootScope", "$location", "AuthenticationService", function(e, o, t) {
        e.$on("$stateChangeSuccess", function(e, t, i, n, r) {
            var a = o.search();
            o.search(a)
        })
    }]).run(["$rootScope", function(l) {
        l.$on("$locationChangeSuccess", function(e, t, i) {
            var n = t.split("#!/")[1];
            if (n) {
                for (var r = n.split("?")[0].split("/"), a = -1, o = "", s = r.length - 1; 0 <= s; s--) {
                    var u = r[s];
                    /^\d+$/.test(u) ? a = parseInt(u) : "" === o && (o = u)
                }
                var c, n = {
                        "quality-specifications": ["info", "review quality specification"],
                        dashboard: ["dashboard", "dashboard"],
                        "projects-selector": ["dashboard", "project selector"],
                        reviews: ["review", "review"],
                        shared: ["review", "shared"],
                        submissions: ["submission", "submission"],
                        projects: ["project", "submit project common"],
                        rubrics: ["rubric", "submit project common"],
                        start: ["rubric", "submit project common"],
                        "submit-zip": ["rubric", "submit zip"],
                        "submit-file": ["rubric", "submit file"],
                        "submit-link": ["rubric", "submit link"],
                        "in-review": ["rubric", "in review"],
                        auth: ["auth", "auth"]
                    },
                    n = o in n ? (c = n[o][0], n[o][1]) : c = "undefined, fix it",
                    i = {
                        url: t,
                        path: t.split("?")[0],
                        referrer: t === i ? document.referrer : i
                    }; - 1 !== a && (i.elID = a), l.segmentPageProperties = i, analytics.page(c, n, i)
            }
        })
    }]), angular.module("udacity.auth", ["udacity.common", "ngCookies", "angular-storage", "ui.router"]),
    function() {
        var e = moment.utc("2017-08-01' 00:00");
        angular.module("udacity.common", ["angular-storage", "ui.router", "ngFileUpload", "hc.marked", "ui.codemirror", "pascalprecht.translate"]).constant("REVIEW_API_URL", "/api/review/v1").constant("REVIEW_SESSION_URL", "https://review-api.udacity.com/sessions").constant("REVIEW_GITHUB_URL", "https://review-api.udacity.com/auth/github").constant("AUTH_URL", "https://auth.udacity.com/sign-in").constant("CODE_AUDIT_RUBRIC_ID", 72).constant("NOCODE_AUDIT_RUBRIC_ID", 82).constant("SMYTE_CLIENT_KEY", "a0324fc4fca953b2ee06047a12f1483a").constant("GRADUATION_API_URL", "/api/graduation").constant("REVIEWS_URL", "https://review.udacity.com").constant("REVIEWS_V2_URL", "https://reviews.udacity.com").constant("AGREEMENT_URL", "https://mentor-dashboard.udacity.com/terms-of-service").constant("HANDBOOK_URL", "https://mentor-dashboard.udacity.com/handbook/reviews").constant("AGREEMENT_DEADLINE", e).constant("LATEST_AGREEMENT_VERSION", "2017-08-01").constant("COURSE_BASE_URL", "https://www.udacity.com/course/viewer#!/").constant("UDACITY_USERS_API_URL", "/api/user").constant("MENTOR_DASHBOARD_URL", "https://mentor-dashboard.udacity.com").constant("CATO_URL", "https://cato.udacity.com/").constant("CLASSROOM_URL", "https://learn.udacity.com").constant("CLASSROOM_CONTENT_URL", "/api/classroom-content").constant("EXPERIMENTS_API_URL", "/api/experiments")
    }(), angular.module("udacity.projects", ["ui.bootstrap", "ui.codemirror", "udacity.common", "udacity.auth", "ngAnimate", "ngSanitize", "angular-storage", "pascalprecht.translate"]), angular.module("udacity.submissions", ["ui.bootstrap", "ui.codemirror", "ui.router", "ngSanitize", "angularMoment", "udacity.common", "pascalprecht.translate"]), angular.module("udacity.grading").config(["$urlRouterProvider", function(e) {
        e.otherwise("/404")
    }]).run(["$rootScope", "$location", "AuthenticationService", "LoadingService", "AlertBoxService", function(e, t, i, n, r) {
        e.$on("$stateChangeStart", function(e, t) {
            n.setLoading(!1), r.propagateNextMessage()
        })
    }]), angular.module("udacity.common").config(["$stateProvider", function(e) {
        e.state("loading", {
            url: "/loading",
            templateUrl: "common/templates/loading.tmpl.html"
        }).state("error", {
            url: "/error",
            templateUrl: "common/templates/error.tmpl.html"
        }).state("forbidden", {
            url: "/forbidden",
            templateUrl: "common/templates/forbidden.tmpl.html"
        }).state("404", {
            url: "/404",
            templateUrl: "common/templates/404.tmpl.html"
        })
    }]), angular.module("udacity.projects").config(["$stateProvider", "$urlRouterProvider", function(e, t) {
        t.when("/projects/{idOrKey}*path", ["$match", "$location", "ProjectsModel", function(i, n, e) {
            return e.translateOrFetch(i.idOrKey).then(function(e) {
                var t = e.data,
                    e = _.chain(t.rubrics).sortBy("created_at").head().value(),
                    t = "/rubric" === i.path ? "/view" : i.path,
                    t = "/rubrics/" + e.id + t;
                n.path(t)
            }, function() {
                n.url("/error")
            })
        }]), e.state("rubrics", {
            abstract: !0,
            url: "/rubrics/:rubricId",
            template: '<div ui-view autoscroll="true"/>'
        }).state("rubrics.show", {
            url: "",
            authenticate: !0,
            templateUrl: "common/templates/loading.tmpl.html",
            controller: "ShowCtrl"
        }).state("rubrics.view", {
            url: "/view",
            authenticate: !0,
            templateUrl: "projects/templates/rubric.tmpl.html",
            controller: "RubricCtrl"
        }).state("rubrics.instructions", {
            url: "/instructions",
            authenticate: !0,
            templateUrl: "projects/templates/instructions.tmpl.html"
        }).state("rubrics.start", {
            url: "/start",
            authenticate: !0,
            templateUrl: "projects/templates/start.tmpl.html"
        }).state("rubrics.submit-repo", {
            url: "/submit-repo",
            authenticate: !0,
            templateUrl: "projects/templates/submit-repo.tmpl.html"
        }).state("rubrics.submit-zip", {
            url: "/submit-zip",
            authenticate: !0,
            templateUrl: "projects/templates/submit-zip.tmpl.html"
        }).state("rubrics.submit-file", {
            url: "/submit-file",
            authenticate: !0,
            templateUrl: "projects/templates/submit-zip.tmpl.html"
        }).state("rubrics.submit-text", {
            url: "/submit-text?template&filename&filetype",
            authenticate: !0,
            templateUrl: "projects/templates/submit-text.tmpl.html"
        }).state("rubrics.submit-link", {
            url: "/submit-link",
            authenticate: !0,
            templateUrl: "projects/templates/submit-link.tmpl.html"
        }).state("rubrics.in-review", {
            url: "/in-review",
            authenticate: !0,
            templateUrl: "projects/templates/in-review.tmpl.html"
        }).state("public-reviews-show", {
            url: "/reviews/:submissionId/shared",
            authenticate: !1,
            templateUrl: "projects/templates/share-review.tmpl.html",
            controller: "ShareReviewCtrl"
        }).state("reviews-show", {
            url: "/reviews/:submissionId?audit",
            authenticate: !0,
            templateUrl: "projects/templates/show-review.tmpl.html",
            controller: "ShowReviewCtrl"
        })
    }]), angular.module("udacity.submissions").config(["$stateProvider", function(e) {
        e.state("submissions", {
            abstract: !0,
            url: "/submissions",
            template: '<div ui-view autoscroll="true"/>'
        }).state("submissions.ready", {
            url: "/ready",
            templateUrl: "submissions/templates/ready.tmpl.html"
        }).state("submissions.show", {
            url: "/{submissionId:[0-9]+}",
            authenticate: !0,
            templateUrl: "submissions/templates/submission-details.tmpl.html",
            controller: "SubmissionDetailsCtrl"
        }).state("submissions.quality-specifications", {
            url: "/quality-specifications?id",
            authenticate: !0,
            templateUrl: "submissions/templates/quality-specifications.tmpl.html"
        }).state("submissions.reviewer-faq", {
            url: "/reviewer-faq",
            authenticate: !0,
            templateUrl: "submissions/templates/reviewer-faq.tmpl.html",
            controller: "FooterCtrl"
        }).state("submissions.student-faq", {
            url: "/student-faq",
            authenticate: !0,
            templateUrl: "submissions/templates/student-faq.tmpl.html",
            controller: "FooterCtrl"
        }).state("submissions.apply", {
            url: "/apply",
            controller: "ApplyCtrl"
        }).state("submissions.dashboard", {
            url: "/dashboard?tab&submitted&certified",
            authenticate: !0,
            controller: "DashboardCtrl"
        }).state("submissions.start", {
            url: "/start",
            authenticate: !0,
            templateUrl: "common/templates/loading.tmpl.html",
            controller: "SubmissionStartCtrl"
        }).state("submissions.projects-selector", {
            url: "/projects-selector",
            authenticate: !0,
            controller: "ProjectsSelectorCtrl"
        }).state("submissions.agreement", {
            url: "/agreement",
            controller: ["AGREEMENT_URL", function(e) {
                window.location.href = e
            }]
        })
    }]), angular.module("udacity.auth").service("AuthenticationService", ["$window", "$cookies", "$location", "$q", "SmyteService", "AUTH_URL", function(t, e, i, n, r, a) {
        this.getJwtCookie = function() {
            return e.get("_jwt") || e.get("_jwt_token")
        }, this.getClaimsFromJWT = function(e) {
            var t = {};
            return t = void 0 !== e ? JSON.parse(atob(e.split(".")[1])) : t
        }, this.clear = function() {
            e.remove("_jwt"), e.remove("_jwt_token")
        }, this.authenticate = function() {
            var e = a + "?next=" + encodeURIComponent(i.absUrl());
            t.open(e, "_self")
        }
    }]), angular.module("udacity.auth").service("IdentificationService", ["$q", "$browser", "$cookies", "UsersModel", function(e, t, i, n) {
        this.ensureIdentified = function() {
            return n.fetch().then(function(e) {
                e = e.data;
                i.get("ajs_user_id") !== '"' + e.udacity_key + '"' && analytics.identify(e.udacity_key, {
                    email: e.email,
                    name: e.name,
                    role: e.role,
                    reviews_app_user_id: e.id,
                    accepted_terms: e.accepted_terms
                })
            })
        }
    }]), angular.module("udacity.submissions").controller("ApiTokenCtrl", ["$scope", "$uibModal", "UsersModel", function(i, n, e) {
        this.showApiTokenModal = function() {
            return e.fetchApiToken().then(function(e) {
                var t = i.$new();
                t.apiToken = e.data.token, n.open({
                    templateUrl: "common/templates/api-token-modal.tmpl.html",
                    scope: t,
                    size: "md"
                })
            })
        }
    }]), angular.module("udacity.common").directive("alertBox", ["$translate", function(s) {
        var u = {
            success: "alert-success",
            notification: "alert-info",
            error: "alert-danger"
        };
        return {
            scope: {},
            replace: !0,
            controller: ["$timeout", "$scope", "$sce", "AlertBoxService", function(i, n, r, e) {
                var a;

                function o() {
                    a && (i.cancel(a), a = null)
                }
                e.setAlertBoxDirectiveScope(n), n.dismissed = !0, n.message = null, n.setMessage = function(e, t) {
                    if (void 0 === (t = void 0 === t ? {} : t).messageType && (t.messageType = "notification"), void 0 === t.timeout && (t.timeout = 15e3), !u[t.messageType]) throw new Error(s.instant("Invalid message type requested: ") + t.messageType);
                    o(), n.dismissed = !1, n.message = r.trustAsHtml(e), n.alertClass = u[t.messageType], t.timeout && (a = i(function() {
                        n.dismiss()
                    }, t.timeout))
                }, n.dismiss = function() {
                    n.dismissed = !0, o()
                }
            }],
            restrict: "A",
            templateUrl: "common/directives/alert-box.tmpl.html"
        }
    }]), angular.module("udacity.common").directive("busyClick", ["$q", function(n) {
        return {
            link: function(t, i) {
                i.on("click", function() {
                    i.prop("disabled", !0), (e = i).find(".glyphicon").hide(), e.prepend(angular.element('<i class="busy-click-spinner glyphicon glyphicon-refresh animate-spin"></i>'));
                    var e = t.$apply(t.busyClick);
                    e && n.when(e).finally(function() {
                        var e;
                        i.prop("disabled", !1), (e = i).find(".busy-click-spinner").remove(), e.find(".glyphicon").show()
                    })
                })
            },
            scope: {
                busyClick: "&"
            }
        }
    }]), angular.module("udacity.common").directive("codeComment", ["CommentsModel", "DirtyPreventNavigationService", function(c, l) {
        return {
            controller: ["$scope", "$element", "$timeout", "$animate", "$translate", function(t, e, i, n, r) {
                function a(e) {
                    t.body = e.body, t.category = e.category, t.commentId = e.id
                }

                function o() {
                    t.editing = !1, t.commentForm.$setPristine(), s(), u()
                }

                function s() {
                    t.$emit("commentLayoutChanged", t.line)
                }

                function u() {
                    i(function() {
                        e.find("img").on("load", function() {
                            s()
                        })
                    })
                }
                u(), l.monitorScope(t, "commentForm"), n.enabled(e.find(".comment-editor"), !1), n.enabled(e.find(".comment-viewer"), !1), t.isNewComment = function() {
                    return !t.commentId
                }, t.editing = t.isNewComment(), t.categories = [{
                    label: "Required",
                    value: "critical"
                }, {
                    label: "Suggestion",
                    value: "nitpick"
                }, {
                    label: "Awesome",
                    value: "awesome"
                }], t.renameCategories = function(e) {
                    return {
                        critical: "Required",
                        nitpick: "Suggestion",
                        awesome: "Awesome"
                    }[e]
                }, t.modifiedComment = {
                    body: t.body || "",
                    category: t.category
                }, t.$on("cancelNewComment", function() {
                    t.isNewComment() && !t.modifiedComment.body && t.cancelComment()
                }), t.submitComment = function() {
                    var e = {
                        body: t.modifiedComment.body,
                        category: t.modifiedComment.category,
                        position: t.line
                    };
                    return t.isNewComment() ? c.create(t.contentId, e).then(function(e) {
                        e = e.data;
                        a(e), t.$emit("commentAdded", e), o()
                    }) : c.update(t.commentId, e).then(function(e) {
                        a(e.data), o()
                    })
                }, t.cancelComment = function() {
                    o(), t.modifiedComment.body = t.body, t.isNewComment() && t.$emit("newCommentCancelled", t.line)
                }, t.deleteComment = function() {
                    confirm(r.instant("Are you sure?")) && c.delete(t.commentId).then(function() {
                        t.$emit("commentDeleted", t.line)
                    })
                }, t.startEdit = function() {
                    t.editing = !0, s()
                }
            }],
            templateUrl: "common/directives/code-comment.tmpl.html",
            scope: {
                contentId: "@",
                line: "@",
                body: "@",
                category: "@",
                commentId: "@",
                editable: "="
            }
        }
    }]), angular.module("udacity.common").service("CodeReviewService", function() {
        this.filterSupportedFiles = function(e) {
            return _.filter(e, function(e) {
                var t = e.path.lastIndexOf(".");
                if (-1 === t) return !0;
                t = e.path.slice(t);
                return !_.includes([".pdf", ".docx"], t)
            })
        }
    }).directive("codeReview", function() {
        return {
            controller: ["$scope", "$timeout", "$element", "CodeReviewService", function(t, i, n, e) {
                t.$watch("filterPattern", _.debounce(function() {
                    t.$apply(function() {
                        ! function(e) {
                            e = (e || "").trim();
                            r = 0 < e.length ? function(e) {
                                return e = (e = e.replace(/[\-\[\]\/\{\}\(\)\+\?\.\\\^\$\|]/g, "\\$&")).replace(/[\*]/g, ".*"), new RegExp(e, "i")
                            }(e) : null
                        }(t.filterPattern)
                    })
                }, 50)), t.files = _.sortBy(e.filterSupportedFiles(t.files), function(e) {
                    return -e.comments_count
                }), t.setCurrentFileIndex = function(e) {
                    t.currentFileIndex === e ? t.currentFileIndex = null : t.currentFileIndex = e, i(function() {
                        var e;
                        0 < (e = n.find("[mirror]")).length && $("html, body").animate({
                            scrollTop: e.offset().top - 66
                        }, 70)
                    })
                }, t.isFileVisible = function(e) {
                    return e = e.path, !r || r.test(e)
                };
                var r = null
            }],
            templateUrl: "common/directives/code-review.tmpl.html",
            restrict: "A",
            scope: {
                files: "=",
                rubric: "=",
                allowComments: "="
            }
        }
    }), angular.module("udacity.common").directive("critiqueEditor", function() {
        return {
            templateUrl: "common/directives/critique-editor.tmpl.html",
            scope: {
                critique: "=",
                success: "&",
                error: "&",
                cancel: "&",
                failedRequiredPlaceholder: "=",
                passedRequiredPlaceholder: "=",
                optionalPlaceholder: "="
            },
            controller: "CritiqueEditorController",
            restrict: "A"
        }
    }).controller("CritiqueEditorController", ["$scope", "$q", "CritiquesModel", "DirtyPreventNavigationService", "$translate", function(t, e, i, n, r) {
        var a = t.failedRequiredPlaceholder || r.instant("Explain why the project doesn't meet the specification and provide guidance for next submission."),
            o = t.passedRequiredPlaceholder || r.instant("Explain what the student needs to do to exceed the specification."),
            s = t.optionalPlaceholder || r.instant("Give the student some constructive feedback.");

        function u(e) {
            return t.modifiedCritique.result === e
        }
        t.rubricItem = t.critique.rubric_item, d(), n.monitorScope(t, "form"), t.toggleCollapse = function() {
            $(".one-line-collapse").collapse("toggle")
        }, t.isObservationRequired = function() {
            return u("failed") || u("passed") && t.isExceedable()
        }, t.isExceedable = function() {
            return !(!t.rubricItem || !t.rubricItem.exceedable)
        };
        var c = !0;

        function l() {
            var e = _.pick(t.modifiedCritique, ["id", "result", "observation"]);
            return i.update(t.critique.id, e).then(function(e) {
                _.extend(t.critique, e.data), (t.success || _.noop)()
            }, function() {
                (t.error || _.noop)()
            })
        }

        function d() {
            t.modifiedCritique = _.omit(t.critique, "rubric_item"), t.modifiedCritique.resultLocked = "passed" === t.critique.prev_result || "exceeded" === t.critique.prev_result, t.modifiedCritique.resultLocked && (t.modifiedCritique.result = t.critique.prev_result)
        }
        t.toggleExceededRequirements = function(e) {
            c = _.isUndefined(e) ? !c : e
        }, t.isExceededRequirementsVisible = function() {
            return c
        }, t.getPlaceholderText = function() {
            return u("failed") ? r.instant("Required:") + " " + a : u("passed") && t.isObservationRequired() ? r.instant("Required:") + " " + o : r.instant("Optional:") + " " + s
        }, t._submit = l, t._reset = function() {
            return confirm(r.instant("Are you sure?")) ? (t.modifiedCritique.observation = null, t.modifiedCritique.resultLocked || (t.modifiedCritique.result = null), l()) : e.when()
        }, t._cancel = function() {
            d(), (t.cancel || _.noop)()
        }
    }]), angular.module("udacity.common").directive("critiqueView", function() {
        return {
            templateUrl: "common/directives/critique-view.tmpl.html",
            scope: {
                critique: "=",
                editable: "=",
                editClicked: "&",
                isCareer: "="
            },
            controller: "CritiqueViewController",
            restrict: "A"
        }
    }).controller("CritiqueViewController", ["$scope", function(e) {
        e.rubricItem = e.critique.rubric_item, e.critiqueLocked = function() {
            return e.critique.autograded
        }
    }]), angular.module("udacity.common").directive("critiquesEditor", function() {
        return {
            templateUrl: "common/directives/critiques-editor.tmpl.html",
            scope: {
                critiquesAccessor: "=",
                editable: "=",
                state: "=",
                failedRequiredPlaceholder: "=",
                passedRequiredPlaceholder: "=",
                optionalPlaceholder: "=",
                submission: "=",
                isCareer: "="
            },
            controller: "CritiquesEditorController",
            restrict: "A"
        }
    }).controller("CritiquesEditorController", ["$scope", "$http", "SubmissionsModel", "DirtyPreventNavigationService", "$translate", function(t, e, i, n, r) {
        t.sectionCritiquesState = {}, n.monitorScope(t, "general-comment-form"), _.each(t.critiquesAccessor.getSections(), function(e) {
            t.sectionCritiquesState[e.id] = {}
        }), t.state && t.$watch("sectionCritiquesState", function() {
            var e = _.map(t.sectionCritiquesState, "editing");
            t.state.editing = _.some(e), t.state.partlyComplete = e && !_.every(e)
        }, !0), t.submission && !t.submission.general_comment && (t.general_comment_editing = !0), t.saveGeneralComment = function() {
            return t.general_comment_editing = !1, i.submitGeneralComment(t.submission.id, t.submission.general_comment)
        }, t.resetGeneralComment = function() {
            return confirm(r.instant("Are you sure?")) && (t.submission.general_comment = null, t.saveGeneralComment(), t.general_comment_editing = !0), !0
        }, t.startEditing = function() {
            t.general_comment_editing = !0
        }
    }]), angular.module("udacity.common").directive("loadingContainer", ["LoadingService", function(e) {
        return {
            controller: ["$scope", function(t) {
                t.loading = !1, t.setLoading = function(e) {
                    t.loading = e
                }, e.setScope(t)
            }],
            restrict: "A",
            transclude: !0,
            templateUrl: "common/directives/loading-container.tmpl.html"
        }
    }]), angular.module("udacity.common").directive("markdownTextarea", ["$q", "$timeout", "AttachmentUploader", "MarkdownTextHelper", "$translate", function(s, u, c, l, d) {
        return {
            scope: {
                form: "="
            },
            restrict: "A",
            transclude: !0,
            templateUrl: "common/directives/markdown-textarea.tmpl.html",
            link: function(i, e) {
                i.accept = "image/*,.pdf";
                var r = e.find("textarea");

                function a() {
                    var e = r.get(0);
                    e.scrollTop = e.scrollHeight
                }

                function o(e) {
                    i.form && i.form.$setValidity("uploading." + r.attr("name"), !e)
                }
                i.$watch("files", function() {
                    ! function(e) {
                        if (i.errorMessage = null, !e || 0 === e.length) return;
                        e = function(e) {
                            if (5 < e.length) return d.instant("You can only attach") + " 5 " + d.instant("images at a time.");
                            for (var t = 0; t < e.length; t++)
                                if (e[t].size && 1e7 < e[t].size) return d.instant("Attachment unsuccessful. Image too large.")
                        }(e);
                        if (e) return i.errorMessage = e;
                        o(!0);
                        var t = [],
                            n = r.val();
                        _.each(i.files, function(i) {
                            n = l.insertFileUploading(n, i), t.push(c.upload(i).then(function(e) {
                                var t = r.val(),
                                    t = l.replaceFileUploadingWithFileLink(t, i, e);
                                r.val(t), a()
                            }, function(e) {
                                var t = r.val(),
                                    t = l.updateFileUploadingStatus(t, i, "Error: " + e);
                                r.val(t), a()
                            }, function(e) {
                                var t = r.val(),
                                    t = e < 100 ? l.updateFileUploadingStatus(t, i, d.instant("Uploading") + " " + e + "%") : l.updateFileUploadingStatus(t, i, d.instant("Processing..."));
                                r.val(t)
                            }))
                        }), r.val(n), u(function() {
                            a()
                        }), s.all(t).finally(function() {
                            o(!1), r.change()
                        })
                    }(i.files)
                })
            }
        }
    }]), angular.module("udacity.common").directive("mirror", ["$compile", "$q", "$timeout", "mirror.WidgetsAccessor", "ContentsModel", "CommentsModel", function(u, c, e, t, l, d) {
        var i = {
            js: "javascript",
            jsx: "javascript",
            ts: {
                name: "javascript",
                typescript: !0
            },
            css: "css",
            html: "text/html",
            htm: "text/html",
            py: "python",
            txt: "text",
            md: "markdown",
            rmd: "markdown",
            markdown: "markdown",
            swift: "text/swift",
            sql: "sql",
            java: "clike",
            xml: "xml",
            gradle: "text",
            rst: "rst",
            yml: "text/x-yaml",
            yaml: "text/x-yaml"
        };
        return {
            scope: {
                file: "=",
                allowComments: "="
            },
            templateUrl: "common/directives/mirror.tmpl.html",
            controller: ["$scope", "$timeout", function(r, n) {
                var a = new t;

                function o(e, t, i) {
                    if (n = a.getWidget(i)) return n;
                    var t = function(e, t) {
                            var i = angular.element("<div></div>");
                            i.attr("id", "comment-wrapper-" + t);
                            var n = angular.element("<div></div>");
                            n.attr({
                                "code-comment": "",
                                line: t,
                                "content-id": r.file.id,
                                editable: r.allowComments
                            }), e && n.attr({
                                body: e.body,
                                category: e.category,
                                "comment-id": e.id
                            });
                            return i.html(n), u(n)(r), i
                        }(t, i),
                        n = e.addLineWidget(i, t.get(0), {
                            coverGutter: !0,
                            noHScroll: !0
                        });
                    return a.setWidget(i, n), s(n), n
                }

                function s(e) {
                    e && n(function() {
                        e.changed()
                    })
                }
                r.$on("commentAdded", function() {
                    r.file.comments_count++
                }), r.$on("commentDeleted", function(e, t) {
                    return r.file.comments_count--, a.removeWidget(t), !1
                }), r.$on("commentLayoutChanged", function(e, t) {
                    return s(a.getWidget(t)), !1
                }), r.$on("newCommentCancelled", function(e, t) {
                    return a.removeWidget(t), !1
                }), r.generateEditorOptions = function(e) {
                    e = e.path.substr(e.path.lastIndexOf(".") + 1).toLowerCase();
                    return {
                        mode: i[e] || "text",
                        theme: "mbo",
                        readOnly: !0,
                        lineNumbers: !0,
                        viewportMargin: 1 / 0
                    }
                }, r.codeMirrorLoaded = function(i) {
                    r.isLoading = !0;
                    var e = l.fetchBlobData(r.file.blob),
                        t = d.all(r.file.id).then(function(e) {
                            return e.data
                        });
                    c.all([e, t]).then(function(e) {
                        var t = e[0],
                            e = e[1];
                        i.setValue(t), angular.forEach(e, function(e) {
                            var t = parseInt(e.position);
                            o(i, e, t)
                        }), i.on("cursorActivity", function() {
                            var e, t;
                            r.allowComments && (t = (e = i).doc.getCursor().line, r.$broadcast("cancelNewComment"), o(e, null, t))
                        }), n(function() {
                            i.refresh()
                        })
                    }).finally(function() {
                        r.isLoading = !1
                    })
                }
            }]
        }
    }]).factory("mirror.WidgetsAccessor", function() {
        function e() {
            this.widgetsByLine = {}
        }
        return e.prototype = {
            getWidget: function(e) {
                return this.widgetsByLine[parseInt(e)]
            },
            setWidget: function(e, t) {
                this.widgetsByLine[parseInt(e)] = t
            },
            removeWidget: function(e) {
                var t = this.getWidget(e);
                t && (t.clear(), this.widgetsByLine[parseInt(e)] = null)
            }
        }, e
    }), angular.module("udacity.common").directive("reviewsList", function() {
        function e(n, i, r, a, e) {
            n.votes = {}, n.user_id, e.fetch().then(function(t) {
                n.user_id = t.data.id, n.reviews.forEach(function(e) {
                    n.votes[e.id] = {
                        grader_id: e.grader_id
                    }
                });
                var e = _.filter(n.reviews, function(e) {
                    return "completed" === e.status && t.data.id !== e.grader_id && t.data.id !== e.user_id
                }).map(function(t) {
                    return a.getVote(t.id, {
                        passthrough403: !0
                    }).then(function(e) {
                        _.assign(n.votes[t.id], {
                            feedback: e.data.feedback,
                            value: e.data.value
                        })
                    })
                });
                i.all(e).then(_.defer(function() {
                    n.$apply()
                }))
            }), n.performedReview = function(e) {
                e = n.votes[e];
                return !_.isUndefined(e) && (!!_.isNumber(e.grader_id) && n.user_id === e.grader_id)
            }, n.filteredReviews = _.filter(n.reviews, function(e) {
                return "erred" !== e.status
            }), e = _.filter(n.filteredReviews, function(e) {
                return "canceled" !== e.status
            }), n.nonCanceledReviewIndexHash = {}, _.each(e, function(e, t, i) {
                n.nonCanceledReviewIndexHash[e.id] = i.length - t
            }), n.showVoteModal = function(e, t) {
                n.voteInProgress = {
                    submissionId: e,
                    newValue: t
                }, r.open({
                    templateUrl: "submissions/templates/vote-feedback-modal.tmpl.html",
                    controller: "VoteFeedbackModalCtrl",
                    controllerAs: "ctrl",
                    scope: n,
                    size: "md"
                })
            }, n.errorMessage = "", n.erred = function(e) {
                n.errorMessage = e
            }
        }
        return e.$inject = ["$scope", "$q", "$uibModal", "SubmissionsModel", "UsersModel"], {
            controller: e,
            templateUrl: "common/directives/reviews-list.tmpl.html",
            scope: {
                reviews: "=",
                thisReview: "=",
                isCareer: "="
            },
            restrict: "A"
        }
    }), angular.module("udacity.common").directive("rubricItemsList", function() {
        return {
            templateUrl: "common/directives/rubric-items-list.tmpl.html",
            controller: "RubricItemsListCtrl",
            scope: {
                rubricId: "="
            },
            restrict: "A"
        }
    }).controller("RubricItemsListCtrl", ["$scope", "RubricItemsAccessor", "RubricItemsModel", function(t, i, e) {
        var n = {};
        t.rubricItemsAccessor = null, e.all(t.rubricId).then(function(e) {
            t.rubricItemsAccessor = new i(e.data), _.each(t.rubricItemsAccessor.getSections(), function(e) {
                n[e.id] = !0
            })
        }), t.toggleExpansion = function(e) {
            n[e] = !n[e]
        }, t.isExpanded = function(e) {
            return n[e]
        }
    }]), angular.module("udacity.common").directive("scrollIf", ["$timeout", function(e) {
        return {
            scope: {
                scrollIf: "="
            },
            link: function(i, n) {
                i.$watch("scrollIf", function() {
                    e(function() {
                        var e, t;
                        !i.scrollIf || (e = $("body").scrollTop(), t = e + $(window).height(), n.offset().top >= e && n.offset().top + n.height() <= t) || $("html, body").animate({
                            scrollTop: n.offset().top - 50
                        }, 70)
                    })
                })
            }
        }
    }]), angular.module("udacity.common").directive("sectionCritiques", function() {
        return {
            templateUrl: "common/directives/section-critiques.tmpl.html",
            scope: {
                section: "=",
                critiques: "=",
                editable: "=",
                state: "=",
                failedRequiredPlaceholder: "=",
                passedRequiredPlaceholder: "=",
                optionalPlaceholder: "=",
                isCareer: "="
            },
            controller: "SectionCritiquesController",
            restrict: "A"
        }
    }).controller("SectionCritiquesController", ["$scope", function(n) {
        var e = !0;
        n.toggleExpansion = function() {
            e = !e
        }, n.isExpanded = function() {
            return e
        };
        var r = {},
            a = null;
        n.setEditingCritique = function(e, t, i) {
            i = _.extend({
                initial: !1
            }, i || {});
            t = !(!t || !n.editable);
            r[e] = t, i.initial || (a = t ? e : null), n.state && (n.state.editing = _.some(_.values(r)))
        }, n.isEditingCritique = function(e) {
            return r[e]
        }, n.isCurrentEditingCritique = function(e) {
            return a === e
        }, _.each(n.critiques, function(e) {
            n.setEditingCritique(e.id, !e.result, {
                initial: !0
            })
        })
    }]), angular.module("udacity.common").directive("singleLineCollapse", function() {
        return {
            templateUrl: "common/directives/single-line-collapse.tmpl.html",
            scope: {
                singleLineCollapse: "=",
                previewLength: "="
            },
            controller: "SingleLineCollapseController",
            restrict: "A"
        }
    }).controller("SingleLineCollapseController", ["$scope", "$element", "$timeout", function(e, t, i) {
        e.collapsed = !0, e.collapse = !0;
        e.singleLineCollapse.length < e.previewLength ? (e.text = e.singleLineCollapse, e.isToggleShown = !1) : (e.text = e.singleLineCollapse.substr(0, e.previewLength) + "&hellip;", e.isToggleShown = !0), e.toggleCollapse = function() {
            e.collapsed ? (e.text = e.singleLineCollapse, i(function() {
                e.collapse = !1, e.collapsed = !1
            })) : (e.collapse = !0, i(function() {
                e.text = e.singleLineCollapse.substr(0, e.previewLength) + "&hellip;", e.collapsed = !0
            }, 350))
        }
    }]), angular.module("udacity.common").directive("stickyFooter", ["$rootScope", function(o) {
        function s(e) {
            return e < $(window).scrollTop() + $(window).height()
        }
        return {
            restrict: "A",
            link: function(e, t) {
                $(window).load(a), $(window).resize(_.throttle(a, 30)), o.$watch(_.debounce(function() {
                    a()
                }, 30, !1)), $(document).scroll(_.throttle(a, 30));
                var i = t.hasClass("sticky-footer"),
                    n = $("#footer"),
                    r = t.height();

                function a() {
                    var e = n.offset().top;
                    return i ? s(e) && (i = !1, t.removeClass("sticky-footer")) : s(t.offset().top + r) || (i = !0, t.addClass("sticky-footer")), !1
                }
            }
        }
    }]), angular.module("udacity.common").factory("CritiquesAccessor", ["RubricItemsAccessor", function(t) {
        function e(e) {
            this.critiquesData = e, this.rubricItemsAccessor = new t(_.map(e, "rubric_item")), this.getCritique = _.memoize(function(e) {
                return _.find(this.critiquesData, {
                    rubric_item_id: e
                })
            }), this.getCritiques = _.memoize(function(e) {
                return _.isUndefined(e) ? this.critiquesData : _.map(this.getRubricItems(e), _.bind(function(e) {
                    return this.getCritique(e.id)
                }, this))
            })
        }
        return e.prototype = {
            getRubricItems: function(e) {
                return this.rubricItemsAccessor.getRubricItems(e)
            },
            getSections: function() {
                return this.rubricItemsAccessor.getSections()
            }
        }, e
    }]), angular.module("udacity.common").factory("DirtyPreventNavigationService", ["$rootScope", "$timeout", function(a, o) {
        var s = !0;
        return {
            monitorScope: function(t, i) {
                var n = "There are unsaved changes. Leave this page?",
                    e = _.uniqueId("beforeunload.DirtyPreventNavigation-");
                $(window).bind(e, function(e) {
                    if (t[i] && !t[i].$pristine) return e.returnValue = n
                });
                var r = a.$on("$stateChangeStart", function(e) {
                    t[i] && !t[i].$pristine && s && (s = !1, o(function() {
                        s = !0
                    }), confirm(n) || e.preventDefault())
                });
                t.$on("$destroy", function() {
                    $(window).unbind(e), r()
                })
            }
        }
    }]), angular.module("udacity.common").factory("RubricItemsAccessor", function() {
        function e(e) {
            this.rubricItemsData = _.sortBy(e, "position"), this.sectionsData = _.chain(this.rubricItemsData).map("section").uniqBy("id").sortBy("position").value(), this.getRubricItems = _.memoize(function(e) {
                return _.filter(this.rubricItemsData, {
                    section_id: e
                })
            })
        }
        return e.prototype = {
            getSections: function() {
                return this.sectionsData
            }
        }, e
    }), angular.module("udacity.common").filter("pluralize", function() {
        return function(e, t, i) {
            i = i || t + "s";
            e = parseInt(e);
            return [e, 1 === e ? t : i].join(" ")
        }
    }), angular.module("udacity.common").filter("resultLabel", function() {
        var i = {
                exceeded: "Exceeds Specification",
                passed: "Meets Specification",
                failed: "Requires Changes",
                partial_passed: "Feedback provided",
                ungradeable: "Requires Changes"
            },
            n = {
                exceeded: "Exceeds Specifications",
                passed: "Meets Specifications",
                failed: "Requires Changes",
                partial_passed: "Feedback provided",
                ungradeable: "Requires Changes"
            };
        return function(e, t) {
            e = (_.has(t, "pluralize") ? n : i)[e];
            return e || ""
        }
    }), angular.module("udacity.common").service("AuditsModel", ["$q", "$http", "Upload", "ApiUrlHelper", function(e, i, t, n) {
        var r = this;
        r.all = function() {
            return i.get(n.createUrl("me", "audits"))
        }, r.markAsRead = function(e) {
            return i.put(n.createUrl("audits", e, "read"))
        }, r.fetchAllBySubmissionId = function(e, t) {
            return i.get(n.createUrl("submissions", e, "audits"), t || {})
        }, r.fetch = function(e) {
            return i.get(n.createUrl("audits", e))
        }, r.assign = function(e, t) {
            t = t ? {
                purpose: t
            } : {};
            return i.post(n.createUrl("projects", e, "audits", "assign"), t)
        }, r.submit = function(e) {
            return i.put(n.createUrl("audits", e, "submit"))
        }, r.unassign = function(e) {
            return i.put(n.createUrl("audits", e, "unassign"))
        }
    }]), angular.module("udacity.common").service("CertAttemptsModel", ["$q", "$http", "ApiUrlHelper", function(e, t, i) {
        this.fetchMyAttempts = function(e) {
            return t.get(i.createUrl("me", "projects", e, "cert_attempts"))
        }, this.startNextAttempt = function(e) {
            return t.post(i.createUrl("me", "projects", e, "cert_attempts", "start"))
        }
    }]), angular.module("udacity.common").service("CertificationsModel", ["$q", "$http", "ApiUrlHelper", function(e, t, i) {
        this.fetchMyCertifications = function() {
            return t.get(i.createUrl("me", "certifications"))
        }, this.fetch = function(e) {
            return t.get(i.createUrl("certifications", e)).then(function(e) {
                return _.each(e.data.trainings, function(e) {
                    e.training_submissions = _.sortBy(e.training_submissions, function(e) {
                        return new Date(e.created_at).getTime()
                    })
                }), e
            })
        }
    }]), angular.module("udacity.common").service("CommentsModel", ["$http", "ApiUrlHelper", function(i, n) {
        this.all = function(e) {
            return i.get(n.createUrl("contents", e, "comments"))
        }, this.create = function(e, t) {
            return i.post(n.createUrl("contents", e, "comments"), t)
        }, this.update = function(e, t) {
            return i.put(n.createUrl("comments", e), t)
        }, this.delete = function(e) {
            return i.delete(n.createUrl("comments", e))
        }
    }]), angular.module("udacity.common").service("ContentsModel", ["$q", "$http", "ApiUrlHelper", function(e, i, t) {
        function r(e) {
            return 96 < e ? e - 71 : 64 < e ? e - 65 : 47 < e ? e + 4 : 43 == e ? 62 : 47 == e ? 63 : 0
        }

        function n(t, e) {
            e = void 0 !== e ? e : "utf-8";
            try {
                var i = new TextEncoder("utf-8").encode(t.replace(/\s/g, "").replace(/=/g, ""));
                return i = function(e) {
                    for (var t = 3 * ~~(e.length / 4) + (e.length % 4 == 0 ? 0 : e.length % 4 - 1), i = new Uint8Array(t), n = 0, r = 1; r < e.length; r++) switch (r % 4) {
                        case 1:
                            i[n++] = (e[r - 1] << 2) + (e[r] >> 4);
                            break;
                        case 2:
                            i[n++] = (e[r - 1] << 4) + (e[r] >> 2);
                            break;
                        case 3:
                            i[n++] = (e[r - 1] << 6) + e[r]
                    }
                    return i
                }(i = i.map(r)), new TextDecoder(e).decode(i)
            } catch (e) {
                return n = t.replace(/\s/g, ""), decodeURIComponent(atob(n).split("").map(function(e) {
                    return "%" + ("00" + e.charCodeAt(0).toString(16)).slice(-2)
                }).join(""))
            }
            var n
        }
        this.all = function(e) {
            return i.get(t.createUrl("submissions", e, "contents"))
        };
        var a = {};
        this.fetchBlobData = function(e) {
            var t = a[e];
            return t || (50 < _.keys(a).length && (a = {}), t = i.get(e).then(function(e) {
                return n(_.get(e, "data", "").replace(/\s/g, ""))
            }), a[e] = t), t
        }
    }]), angular.module("udacity.common").service("CritiquesModel", ["$http", "ApiUrlHelper", function(i, n) {
        var e = this;
        e.update = function(e, t) {
            return i.put(n.createUrl("critiques", e), t)
        }, e.allForSubmission = function(e) {
            return i.get(n.createUrl("submissions", e, "critiques"))
        }, e.allForAudit = function(e) {
            return i.get(n.createUrl("audits", e, "critiques"))
        }, e.allForPlagiarismCase = function(e) {
            return i.get(n.createUrl("plagiarism_cases", e, "critiques"))
        }, e.createForSubmission = function(e, t) {
            return i.post(n.createUrl("submissions", e, "critiques"), {
                rubric_item_id: t
            })
        }, e.createForAudit = function(e, t) {
            return i.post(n.createUrl("audits", e, "critiques"), {
                rubric_item_id: t
            })
        }
    }]), angular.module("udacity.common").service("EnrollmentsModel", ["$q", "$http", "ApiUrlHelper", function(e, t, i) {
        this.fetchEnrollment = function(e) {
            return t.get(i.createUrl("enrollments", e), {
                passthrough403: !0
            })
        }
    }]), angular.module("udacity.common").service("EntitlementsModel", ["$q", "$http", "ApiUrlHelper", function(e, i, n) {
        var t = this;
        t.fetchMyEntitlements = function(e, t) {
            return i.get(n.createUrl("me", "entitlements"), {
                params: {
                    project_id: e,
                    active: t
                }
            })
        }, t.check = function(e) {
            return t.fetchMyEntitlements(e, !0).then(function(e) {
                0 === e.data.length && (e = n.getCareerPortalLink(), window.location.href = e)
            })
        }
    }]), angular.module("udacity.common").service("ExperimentsModel", ["$http", "EXPERIMENTS_API_URL", function(n, r) {
        this.activate = function(e, t, i) {
            i = i || {}, t = r + "/v1/users/" + e + "/experiments/" + t + "/activation";
            return n.post(t, i)
        }
    }]), angular.module("udacity.common").service("OnboardingsModel", ["$q", "$http", "ApiUrlHelper", function(e, t, i) {
        this.attempt = function(e) {
            return t.post(i.createUrl("trainings", e, "attempt"))
        }
    }]), angular.module("udacity.common").service("PlagiarismCasesModel", ["$q", "$http", "Upload", "ApiUrlHelper", function(e, i, t, n) {
        var r = this;
        r.all = function() {
            return i.get(n.createUrl("me", "plagiarism_cases"))
        }, r.fetchAllBySubmissionId = function(e, t) {
            return i.get(n.createUrl("submissions", e, "plagiarism_cases"), t || {})
        }, r.fetch = function(e) {
            return i.get(n.createUrl("plagiarism_cases", e))
        }, r.submit = function(e) {
            return i.put(n.createUrl("plagiarism_cases", e, "submit"))
        }, r.unassign = function(e) {
            return i.put(n.createUrl("plagiarism_cases", e, "unassign"))
        }
    }]), angular.module("udacity.common").service("ProjectRatingModel", ["$q", "$http", "ApiUrlHelper", function(e, t, i) {
        this.fetchBySubmissionId = function(e) {
            return t.get(i.createUrl("submissions", e, "project_rating"))
        }, this.create = function(e) {
            return t.post(i.createUrl("project_ratings"), e)
        }
    }]), angular.module("udacity.common").service("ProjectsModel", ["$q", "$http", "ApiUrlHelper", function(t, n, r) {
        var a = this;
        a.fetch = function(e) {
            return n.get(r.createUrl("projects", e))
        }, a.fetchWithNanodegree = function(e) {
            return n.get(r.createUrl("projects", e) + "?decode_nd_key=true")
        }, a.translate = function(e) {
            return t(function(t, i) {
                n.post(r.getClassroomContentGraphqlUrl(), {
                    query: _.template('query ReviewsProjectByKey{project(key: "${udacityKey}" ) {rubric_id}}')({
                        udacityKey: e
                    }),
                    variables: null,
                    locale: null
                }).then(function(e) {
                    e = e.data.data.project.rubric_id;
                    n.get(r.createUrl("rubrics", e)).then(function(e) {
                        t(e)
                    }, i)
                }, i)
            })
        }, a.translateOrFetch = function(n) {
            return t(function(t, i) {
                a.translate(n).then(function(e) {
                    (e.data ? a.fetch(e.data.project_id) : a.fetch(n)).then(t, i)
                }, i)
            })
        }, a.updateProjectGradable = function(e, t) {
            e = r.createUrl("projects", e, "certification");
            return t ? n.post(e) : n.delete(e)
        }
    }]), angular.module("udacity.common").service("ReviewerToolkitModel", ["$q", "$http", "ApiUrlHelper", function(e, i, n) {
        this.fetch = function(e, t) {
            return i.get(n.createUrl("reviewer_toolkits"), {
                params: {
                    project_id: e,
                    language: t
                }
            }).then(function(e) {
                return 0 === e.data.length ? e.data = null : e.data = e.data[0], e
            })
        }
    }]), angular.module("udacity.common").service("RubricItemsModel", ["$http", "ApiUrlHelper", function(t, i) {
        var n = this;
        n.all = function(e) {
            return t.get(i.createUrl("rubrics", e, "rubric_items"))
        }, n.allOptional = function(e) {
            return n.all(e).then(function(e) {
                var t = e.data,
                    t = _.filter(t, {
                        optional: !0
                    });
                return e.data = t, e
            })
        }
    }]), angular.module("udacity.common").service("RubricsModel", ["$q", "$http", "ApiUrlHelper", function(e, i, n) {
        this.fetch = function(e, t) {
            return t = t || {}, i.get(n.createUrl("rubrics", e), t)
        }, this.fetchAlternates = function(e) {
            return i.get(n.createUrl("rubrics"), {
                params: {
                    project_id: e
                }
            })
        }
    }]), angular.module("udacity.common").service("StudentFeedbacksModel", ["$q", "$http", "ApiUrlHelper", function(e, i, n) {
        var t = this;
        t.all = function() {
            return i.get(n.createUrl("me", "student_feedbacks"))
        }, t.fetchMyStats = function() {
            return i.get(n.createUrl("me", "student_feedbacks", "stats"))
        }, t.markAsRead = function(e) {
            return i.put(n.createUrl("student_feedbacks", e, "read"))
        }, t.create = function(e, t) {
            return i.post(n.createUrl("submissions", e, "student_feedback"), t)
        }, t.fetchBySubmissionId = function(e) {
            return i.get(n.createUrl("submissions", e, "student_feedback"))
        }
    }]), angular.module("udacity.common").service("SubmissionsModel", ["$q", "$http", "Upload", "ApiUrlHelper", function(t, r, n, a) {
        var o = this;

        function s(e) {
            var i = t.defer();
            return e.progress(function(e) {
                e = parseInt(100 * e.loaded / e.total);
                i.notify(e)
            }).success(function(e) {
                i.resolve(e)
            }).error(function(e, t) {
                i.reject({
                    data: e,
                    status: t
                })
            }), i.promise
        }
        o.fetchUserSubmissions = function(e, t) {
            return r.get(a.createUrl("users", e, "submissions") + "?rubric_id=" + t)
        }, o.fetchAssignedSubmissions = function() {
            return r.get(a.createUrl("me", "submissions", "assigned"))
        }, o.fetchMyRubricSubmissions = function(e) {
            return r.get(a.createUrl("me", "submissions"), {
                params: {
                    rubric_id: parseInt(e, 10)
                }
            })
        }, o.fetchMyLatestRubricSubmission = function(i) {
            return t(function(t, e) {
                o.fetchMyRubricSubmissions(i).then(function(e) {
                    e.data = e.data[0], t(e)
                }, function() {
                    e()
                })
            })
        }, o.fetch = function(e) {
            return r.get(a.createUrl("submissions", e))
        }, o.createWithRepo = function(e, t) {
            return r.post(a.createUrl("rubrics", e, "submissions", "create_for_repo"), t, {
                passthrough403: !0
            })
        }, o.createWithUrl = function(e, t) {
            return (t = t || {}).notes = t.notes || "", r.post(a.createUrl("rubrics", e, "submissions", "create_for_url"), t, {
                passthrough403: !0
            })
        }, o.createWithZipFile = function(e, t, i) {
            return s(n.upload({
                url: a.createUrl("rubrics", e, "submissions", "create_for_zipfile"),
                fields: t,
                file: i,
                fileFormDataName: "zipfile",
                passthrough403: !0
            }))
        }, o.createWithFiles = function(e, t, i) {
            return s(n.upload({
                url: a.createUrl("rubrics", e, "submissions", "create_for_files"),
                file: i,
                fields: t,
                fileFormDataName: "files[]"
            }))
        }, o.createWithText = function(e, t, i, n) {
            n = _.extend({}, t, {
                filename: i,
                text: n
            });
            return r.post(a.createUrl("rubrics", e, "submissions", "create_for_text"), n, {
                passthrough403: !0
            })
        }, o.unassignSubmission = function(e) {
            return r.put(a.createUrl("submissions", e, "unassign"))
        }, o.assignSubmission = function(e, t) {
            return r.post(a.createUrl("projects", e, "submissions", "assign"), {
                lang: t
            })
        }, o.ungradeable = function(e, t, i, n) {
            n = {
                notes: t,
                tag: i,
                plagiarism_source_url: n
            };
            return r.put(a.createUrl("submissions", e, "ungradeable"), n)
        }, o.submitFeedback = function(e, t) {
            return r.put(a.createUrl("submissions", e, "submit"), t)
        }, o.submitGeneralComment = function(e, t) {
            return r.put(a.createUrl("submissions", e, "general_comment"), {
                general_comment: t
            })
        }, o.createAudit = function(e) {
            return r.post(a.createUrl("submissions", e, "create_audit"))
        }, o.reviseReview = function(e) {
            return r.post(a.createUrl("submissions", e, "revise"))
        }, o.uploadAnnotations = function(e, t) {
            return s(n.upload({
                url: a.createUrl("submissions", e, "upload_annotations"),
                file: t,
                fileFormDataName: "files[]"
            }))
        }, o.delete = function(e) {
            return r.delete(a.createUrl("submissions", e))
        }, o.postVote = function(e, t, i) {
            i = {
                value: t,
                feedback: i || ""
            };
            return r.post(a.createUrl("submissions", e, "vote"), i)
        }, o.getVote = function(e, t) {
            return r.get(a.createUrl("submissions", e, "vote"), t || {})
        }
    }]), angular.module("udacity.common").service("UsersModel", ["$http", "ApiUrlHelper", function(t, i) {
        var e = this,
            n = null;
        e.fetch = function() {
            return n = n || t.get(i.createUrl("me"))
        }, e.fetchReviewer = function(e) {
            return t.get(i.createReviewerUrl(e))
        }, e.update = function(e) {
            return t.put(i.createUrl("me"), e)
        }, e.logout = function() {
            return t.delete(i.createUrl("sessions"))
        }, e.fetchRepos = function() {
            return t.get(i.createUrl("me", "github", "repos"))
        }, e.fetchGithubAuthorization = function() {
            return t.get(i.createUrl("me", "github", "authorization"))
        }, e.acceptTos = function() {
            return t.put(i.createUrl("me"), {
                accepted_terms: !0
            })
        }, e.becomeGrader = function() {
            return t.put(i.createUrl("me", "become_grader"))
        }, e.fetchApiToken = function() {
            return t.get(i.createUrl("me", "api_token"))
        }
    }]), angular.module("udacity.common").service("AlertBoxService", function() {
        var i, n, r;
        this.setNowMessage = function(e, t) {
            r.setMessage(e, t)
        }, this.setNextMessage = function(e, t) {
            i = e, n = t
        }, this.propagateNextMessage = function() {
            r.setMessage(i, n), n = i = void 0
        }, this.setAlertBoxDirectiveScope = function(e) {
            r = e
        }
    }), angular.module("udacity.common").service("ApiUrlHelper", ["REVIEW_API_URL", "GRADUATION_API_URL", "CLASSROOM_URL", "CLASSROOM_CONTENT_URL", function(t, i, n, e) {
        var r = this;
        r.createUrl = function() {
            var e = Array.prototype.slice.call(arguments);
            return e.unshift(t), e.join("/") + ".json"
        }, r.createGraduationApiUrl = function() {
            var e = Array.prototype.slice.call(arguments);
            return e.unshift(i), e.join("/")
        }, r.createReviewerUrl = function(e) {
            return t + "/user/reviewer_bio?user_id=" + e
        }, r.isUdacityUrl = function(e) {
            return $("<a>", {
                href: e
            })[0].hostname.match(/.*\.udacity\.com/)
        }, r.getCareerPortalLink = function(e) {
            return n + "/career/main#careerServices"
        }, r.getClassroomContentGraphqlUrl = function() {
            return e + "/v1/graphql"
        }
    }]), angular.module("udacity.common").service("AttachmentUploader", ["$q", "Upload", "ApiUrlHelper", function(i, n, r) {
        this.upload = function(e) {
            var t = i.defer();
            return n.upload({
                url: r.createUrl("attachments"),
                file: e
            }).progress(function(e) {
                e = parseInt(100 * e.loaded / e.total);
                t.notify(e)
            }).success(function(e) {
                t.resolve(e.url)
            }).error(function(e) {
                t.reject(e.error)
            }), t.promise
        }
    }]), angular.module("udacity.common").service("AuthInterceptor", ["$window", "$q", "$location", "AuthenticationService", "ApiUrlHelper", function(e, t, i, n, r) {
        this.request = function(e) {
            var t = n.getJwtCookie();
            return t && r.isUdacityUrl(e.url) && (e.headers.Authorization = "Bearer " + t), e
        }, this.responseError = function(e) {
            return 401 === e.status ? (n.clear(), n.authenticate()) : 403 !== e.status || e.config.passthrough403 || i.path("/forbidden"), t.reject(e)
        }
    }]), angular.module("udacity.common").service("CountryService", function() {
        this.commonLanguages = [{
            code: "ar",
            name: "Arabic (Modern Standard)"
        }, {
            code: "bn",
            name: "Bengali"
        }, {
            code: "zh_HANS",
            name: "Chinese (Simplified)"
        }, {
            code: "zh_HANT",
            name: "Chinese (Traditional)"
        }, {
            code: "en",
            name: "English"
        }, {
            code: "fr",
            name: "French"
        }, {
            code: "de",
            name: "German"
        }, {
            code: "gu",
            name: "Gujarati"
        }, {
            code: "he",
            name: "Hebrew"
        }, {
            code: "hi",
            name: "Hindi"
        }, {
            code: "it",
            name: "Italian"
        }, {
            code: "id",
            name: "Indonesian"
        }, {
            code: "ja",
            name: "Japanese"
        }, {
            code: "ko",
            name: "Korean"
        }, {
            code: "pt",
            name: "Portuguese"
        }, {
            code: "ru",
            name: "Russian"
        }, {
            code: "es",
            name: "Spanish"
        }, {
            code: "tr",
            name: "Turkish"
        }, {
            code: "ur",
            name: "Urdu"
        }], this.countryNames = ["Afghanistan", "Akrotiri", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Arctic Ocean", "Argentina", "Armenia", "Aruba", "Ashmore and Cartier Islands", "Atlantic Ocean", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Baker Island", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burma", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Clipperton Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Republic of the Congo", "Democratic Republic of the Congo", "Cook Islands", "Coral Sea Islands", "Costa Rica", "Cote d'Ivoire", "Croatia", "Cuba", "Curacao", "Cyprus", "Czech Republic", "Denmark", "Dhekelia", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Islas Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern and Antarctic Lands", "Gabon", "Gambia", "Gaza Strip", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guadeloupe", "Guatemala", "Guernsey", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard Island and McDonald Islands", "Holy See (Vatican City)", "Honduras", "Hong Kong", "Howland Island", "Hungary", "Iceland", "India", "Indian Ocean", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Jan Mayen", "Japan", "Jarvis Island", "Jersey", "Johnston Atoll", "Jordan", "Kazakhstan", "Kenya", "Kingman Reef", "Kiribati", "North Korea", "South Korea", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mexico", "Micronesia, Federated States of", "Midway Islands", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nauru", "Navassa Island", "Nepal", "Netherlands", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pacific Ocean", "Pakistan", "Palau", "Palmyra Atoll", "Panama", "Papua New Guinea", "Paracel Islands", "Paraguay", "Peru", "Philippines", "Pitcairn Islands", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Barthelemy", "Saint Helena, Ascension, and Tristan da Cunha", "Saint Kitts and Nevis", "Saint Lucia", "Saint Martin", "Saint Pierre and Miquelon", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Sint Maarten", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "Southern Ocean", "South Georgia and South Sandwich Islands", "South Sudan", "Spain", "Spratly Islands", "Sri Lanka", "Sudan", "Suriname", "Svalbard", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Pacific Island Wildlife Refuges", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Virgin Islands", "Wake Island", "Wallis and Futuna", "West Bank", "Western Sahara", "Yemen", "Zambia", "Zimbabwe"], this.paypalSupportedCountryNames = ["Argentina", "Australia", "Austria", "Belgium", "Brazil", "Bulgaria", "Canada", "Chile", "China", "Costa Rica", "Cyprus", "Czech Republic", "Denmark", "Dominican Republic", "Ecuador", "Estonia", "Finland", "France", "French Guiana", "Germany", "Gibraltar", "Greece", "Guadeloupe", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malaysia", "Malta", "Martinique", "Mexico", "Netherlands", "New Zealand", "Norway", "Philippines", "Poland", "Portugal", "Reunion", "Romania", "San Marino", "Singapore", "Slovakia", "South Korea", "Spain", "Sweden", "Switzerland", "Taiwan", "Thailand", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Venezuela", "Vietnam"]
    }), angular.module("udacity.common").service("ErrorHelper", ["$translate", function(t) {
        var i = t.instant("error.DEFAULT_ERROR_MESSAGE"),
            n = t.instant("error.SUBMIT_TIMEOUT_ERROR_MESSAGE"),
            r = t.instant("error.INTERNAL_SERVER_ERROR_MESSAGE"),
            a = t.instant("error.UNAUTHENTICATED_ERROR_MESSAGE"),
            o = [{
                "base:student_has_open_submission": t.instant("error.base:student_has_open_submission"),
                "base:student_already_passed": t.instant("error.base:student_already_passed")
            }, {
                "base:not_submitted_to_project_assistant": t.instant("error.base:not_submitted_to_project_assistant")
            }, {
                "zipfile:not_a_zip": t.instant("error.zipfile:not_a_zip"),
                "repo_url:unable_to_process_repo": t.instant("error.repo_url:unable_to_process_repo")
            }, {
                "zipfile:too_big": t.instant("error.zipfile:too_big"),
                "zipfile:too_many_files": t.instant("error.zipfile:too_many_files"),
                "zipfile:too_many_reviewable_files": t.instant("error.zipfile:too_many_reviewable_files"),
                "zipfile:no_files_submitted": t.instant("error.zipfile:no_files_submitted"),
                "repo_url:too_big": t.instant("error.repo_url:too_big"),
                "repo_url:too_many_files": t.instant("error.repo_url:too_many_files"),
                "repo_url:too_many_reviewable_files": t.instant("error.repo_url:too_many_files"),
                "repo_url:no_files_submitted": t.instant("error.repo_url:no_files_submitted")
            }, {
                "annotations:bad_extension": t.instant("error.annotations:bad_extension"),
                "annotations:too_big": t.instant("error.annotations:too_big"),
                "zipfile:bad_extension": t.instant("error.zipfile:bad_extension")
            }, {
                "base:reviewer_at_limit": t.instant("error.base:reviewer_at_limit"),
                "language:grader_language_does_not_match": t.instant("error.language:grader_language_does_not_match")
            }],
            s = this;
        s.translateResponse = function(e) {
            return 504 === e.status ? n : 403 === e.status ? _.get(e, "data.error") || t.instant("Not Authorized") : 400 == e.status ? s.translateBadRequestResponse(e) : 500 == e.status ? r : 401 == e.status ? a : i
        }, s.translateBadRequestResponse = function(e) {
            if (e.data && e.data.error_details) {
                var t = s.getErrorCodesFromErrorDetails(e.data.error_details);
                return s.fetchErrorMessage(t)
            }
            return JSON.stringify(e.data)
        }, s.fetchErrorMessage = function(e) {
            "string" == typeof e && (e = [e]);
            for (var t = 0; t < o.length; t++)
                for (var i, n = o[t], r = 0; r < e.length; r++)
                    if ((i = e[r]) in n) return n[i];
            return i
        }, s.getErrorCodesFromErrorDetails = function(e) {
            return _.flatMap(e, function(e, t) {
                return _.map(e, function(e) {
                    e = e.error;
                    return t + ":" + e
                })
            })
        }
    }]), angular.module("udacity.common").service("GlobalAlertsService", ["AlertBoxService", "AGREEMENT_URL", "LATEST_AGREEMENT_VERSION", "AGREEMENT_DEADLINE", function(t, i, n, e) {
        var r = this;
        r._agreementDeadline = function() {
            return e
        }, r.displayAnyTermsAlerts = function(e) {
            e.accepted_terms ? e.agreement_version < n && r.alertNewTos() : r.alertTermsNotAccepted()
        }, r.alertNewTos = function() {
            var e = r._agreementDeadline();
            t.setNowMessage(_.template('We\'ve updated our Udacity Mentor Agreement. Please read and agree to the <a href="${AGREEMENT_FORM_URL}" target="blank">new terms</a> by ${DEADLINE} in order to continue work past that date.')({
                AGREEMENT_FORM_URL: i,
                DEADLINE: e.format("dddd, MMMM Do, YYYY")
            }), {
                messageType: "notification",
                timeout: null
            })
        }, r.alertTermsNotAccepted = function() {
            t.setNowMessage(_.template('You have not accepted the latest version of the Udacity Mentor Agreement. Please read and agree to the <a href="${AGREEMENT_FORM_URL}" target="blank">new terms</a> to continue work.')({
                AGREEMENT_FORM_URL: i
            }), {
                messageType: "error",
                timeout: null
            })
        }
    }]), angular.module("udacity.common").service("LanguageService", ["$http", "$translate", "UsersModel", "UDACITY_USERS_API_URL", function(t, i, e, n) {
        var r = this,
            a = null,
            o = {
                "en-us": "English",
                es: "Español",
                "pt-br": "Português",
                "zh-cn": "中文"
            };
        r.supportedLanguages = function() {
            return o
        }, r.fetchUserLanguage = function(e) {
            return t.get(n + "/me/preferences").then(function(e) {
                if (!e.data.objects) return i.fallbackLanguage();
                e = _.find(e.data.objects, ["name", "preferred_language"]);
                return e.value ? e.value.toLowerCase() : i.fallbackLanguage()
            })
        }, r.setUserLanguage = function() {
            return a = a || e.fetch().then(function(e) {
                e = e.data;
                return r.fetchUserLanguage(e.udacity_key).then(function(e) {
                    return i.use(e).then(function() {
                        return i.use()
                    })
                })
            })
        }, r.convertToSupportedLanguage = function(t) {
            return _.find(_.keys(o), function(e) {
                return e.slice(0, 2) === t.replace(/(-|_).*/, "")
            })
        }
    }]), angular.module("udacity.common").service("LoadingService", function() {
        var t;
        this.setScope = function(e) {
            t = e
        }, this.setLoading = function(e) {
            t && t.setLoading(e)
        }
    }), angular.module("udacity.common").service("MarkdownTextHelper", function() {
        function n(e) {
            return o(e) ? new RegExp("!\\[.+\\]\\(" + t(e.name) + "\\)") : new RegExp("\\[.+\\]\\(" + t(e.name) + "\\)")
        }

        function r(e, t) {
            return a(e, t, e.name)
        }

        function a(e, t, i) {
            return (o(e) ? "!" : "") + "[" + t + "](" + i + ")"
        }

        function t(e) {
            return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
        }

        function o(e) {
            return e.type.match(/image\/.*/)
        }
        this.insertFileUploading = function(e, t) {
            t = r(t, "Uploading");
            return 0 < e.length && (e += "\n"), e + t
        }, this.updateFileUploadingStatus = function(e, t, i) {
            i = r(t, i), t = n(t);
            return e.replace(t, i)
        }, this.replaceFileUploadingWithFileLink = function(e, t, i) {
            i = a(t, t.name, i), t = n(t);
            return e.replace(t, i)
        }
    }), angular.module("udacity.common").config(function() {
        var e = new marked.Renderer;
        e.image = function(e, t, i) {
            return '<a href="' + e + '" target="_blank">' + marked.Renderer.prototype.image.call(this, e, t, i) + "</a>"
        }, e.link = function(e, t, i) {
            i = marked.Renderer.prototype.link.call(this, e, t, i);
            return $(i).attr("target", "_blank").get(0).outerHTML
        }, marked.setOptions({
            renderer: e,
            highlight: function(e) {
                return hljs.highlightAuto(e).value
            },
            sanitize: !0,
            gfm: !0,
            breaks: !0,
            emoji: function(e) {
                var t = e.split("|"),
                    e = t[0],
                    t = (t = t[1] || "") && " animated slower infinite " + escape(t);
                return ['<img src="', "/assets/images/emojis/", encodeURIComponent(e), '.png"', ' alt=":', escape(e), ':"', ' title=":', escape(e), ':"', ' class="emoji', t, '"/>'].join("")
            }
        })
    }), angular.module("udacity.common").run(function() {
        moment.locale("en", {
            relativeTime: {
                future: "%s",
                past: "%s ago",
                s: "1s",
                m: "1m",
                mm: "%dm",
                h: "1h",
                hh: "%dh",
                d: "1d",
                dd: function(e) {
                    var t = Math.round(e / 7);
                    return e < 7 ? e + " days" : 1 === t ? "1 week" : t + " weeks"
                },
                M: "1 month",
                MM: "%d months",
                y: "1y",
                yy: "%dy"
            },
            longDateFormat: {
                LT: "h:mm A",
                LTS: "h:mm:ss A",
                L: "MM/DD/YYYY",
                LL: "MMM D, YYYY",
                LLL: "MMMM Do YYYY LT",
                LLLL: "dddd, MMMM Do YYYY LT"
            }
        })
    }), angular.module("udacity.common").provider("PageContextProvider", function() {
        var i = {
                headerURL: "common/templates/header.tmpl.html",
                footerURL: "common/templates/footer.tmpl.html"
            },
            n = angular.copy(i);
        return {
            $get: ["$rootScope", "$location", function(e, t) {
                return e.$on("$locationChangeStart", function() {
                    angular.extend(n, i)
                }), n
            }]
        }
    }), angular.module("udacity.common").service("SmyteService", ["SMYTE_CLIENT_KEY", function(n) {
        this.SUBMISSION_REVIEWING = "submission_reviewing", this.init = function(e) {
            var t, i;
            t = window, i = document, t._smyte = t._smyte || [], (t = i.createElement("script")).async = 1, t.src = "//ping.smyte.com/p.js", (i = i.getElementsByTagName("script")[0]).parentNode.insertBefore(t, i), _smyte.push(["_setClientKey", n]), _smyte.push(["_setSession", {
                id: Math.random().toString(36),
                actor: e
            }]), _smyte.push(["_log"])
        }, this.log = function(e, t) {
            _smyte && _smyte.push(["_log", {
                name: e,
                data: t
            }])
        }
    }]), angular.module("udacity.common").service("TermsNotAcceptedInterceptor", ["$q", "ApiUrlHelper", "GlobalAlertsService", function(t, e, i) {
        this.responseError = function(e) {
            return 409 === e.status && "terms_not_accepted" == e.data.error_code && i.alertTermsNotAccepted(), t.reject(e)
        }
    }]), angular.module("udacity.projects").component("commentBox", {
        templateUrl: "projects/components/comment-box.tmpl.html",
        controller: ["$scope", "$element", "$attrs", function(e, t, i) {}],
        bindings: {
            comment: "=",
            rating: "="
        }
    }), angular.module("udacity.projects").component("reactionFeedback", {
        templateUrl: "projects/components/reaction-feedback.tmpl.html",
        controller: ["$scope", "$element", "$attrs", function(e, t, i) {}],
        bindings: {
            rating: "=",
            hoverValue: "="
        }
    }), angular.module("udacity.projects").component("startFeedbackButton", {
        templateUrl: "projects/components/start-feedback-button.tmpl.html",
        controller: ["$scope", "$element", "$attrs", function(e, t, i) {
            var n = this;
            n.rate = function() {
                n.startFeedback()
            }
        }],
        bindings: {
            startFeedback: "&"
        },
        transclude: !0
    }), angular.module("udacity.projects").controller("InReviewCtrl", ["$rootScope", "$scope", "$q", "$stateParams", "REVIEWS_URL", "UsersModel", "LoadingService", "$window", "CLASSROOM_URL", function(e, t, i, n, r, a, o, s, u) {
        s.location.href = u + "/project-submitted-success"
    }]), angular.module("udacity.projects").controller("InstructionsCtrl", ["$scope", "$stateParams", "LoadingService", "RubricsModel", function(t, e, i, n) {
        i.setLoading(!0), n.fetch(e.rubricId, {
            params: {
                for_eligible_grader: 1
            }
        }).then(function(e) {
            t.rubric = e.data
        }).finally(function() {
            i.setLoading(!1)
        })
    }]), angular.module("udacity.projects").controller("ProjectRatingReactionModalCtrl", ["$scope", "$uibModalInstance", "ProjectRatingModel", "submission", "project", function(i, t, n, r, e) {
        var a = [],
            o = this;
        o.nanodegreeName = e.nanodegree_title, o.projectName = e.name, o.rating = null, o.comment = void 0, o.hoverValue = null, o.rating = null;
        var s = 0,
            u = [{
                key: "project_overall",
                question: "feedback-modal.project-quality-question",
                answers: {
                    frown: "feedback-modal.project-quality-frown",
                    neutral: "feedback-modal.project-quality-neutral",
                    happy: "feedback-modal.project-quality-happy"
                }
            }];
        o.getAllSteps = function() {
            return u
        }, o.getCurrentStep = function() {
            return o.getAllSteps()[s]
        }, o.getCurrentQuestion = function() {
            return this.getCurrentStep().question
        }, o.getAnswerText = function(e) {
            return this.getCurrentStep().answers[e]
        }, o.isLastStep = function() {
            return s === o.getAllSteps().length - 1
        }, o.isActiveStep = function(e) {
            return e === s
        }, o.isVisitedStep = function(e) {
            return e < s
        }, o.isUnrated = function() {
            return null === o.rating
        }, o.getNextStep = function() {
            a.push({
                rating: o.rating,
                comment: o.comment,
                key: o.getCurrentStep().key,
                question_text: o.getCurrentQuestion()
            }), o.rating = null, o.comment = "", o.isLastStep() || s++
        }, i.$watch("ctrl.rating", function(e, t) {
            0 === e && (i.ctrl.rating = t)
        }), o.submitFeedback = function() {
            o.getNextStep();
            var e = {
                responses: {
                    feedback: a,
                    version: "1.0.0"
                },
                submission_id: r.id
            };
            n.create(e).then(function() {
                t.close()
            }).catch(function() {
                t.close()
            })
        }
    }]), angular.module("udacity.projects").controller("ReviewerBioModalCtrl", ["$scope", "$uibModalInstance", "mentor", function(e, t, i) {
        e.mentor = i
    }]), angular.module("udacity.projects").controller("RubricCtrl", ["$q", "$scope", "$stateParams", "$translate", "CertificationsModel", "LanguageService", "LoadingService", "RubricsModel", "marked", function(t, i, e, r, n, a, o, s, u) {
        var e = e.rubricId,
            c = this;
        c.rubric = null, c.supportedLanguages = a.supportedLanguages(), c.tableSettings = {
            showReviewerTips: !1
        }, o.setLoading(!0), s.fetch(e, {
            params: {
                for_eligible_grader: 1
            }
        }).then(function(e) {
            c.rubric = e.data, i.shouldShowReviewerTips(c.rubric.project_id).then(function(e) {
                c.tableSettings = {
                    showReviewerTips: e
                }
            }).finally(o.setLoading(!1))
        }), i.localize = function(e, t, i) {
            if (e) {
                var n = e.translations,
                    t = n && n[r.use()] && n[r.use()][t] || e[t];
                return i && t ? u(t) : t
            }
        }, i.shouldShowReviewerTips = function(e) {
            return i.isStaff ? t.when(!0) : i.isCertifiedGrader(e)
        }, i.isCertifiedGrader = function(i) {
            return n.fetchMyCertifications().then(function(e) {
                var t = {
                    project_id: i,
                    status: "certified"
                };
                return !_.isEmpty(_.filter(e.data, t))
            })
        }
    }]), angular.module("udacity.projects").controller("ShareReviewCtrl", ["$scope", "$q", "$stateParams", "SubmissionsModel", "ProjectsModel", "RubricsModel", "CritiquesAccessor", "CritiquesModel", "PageContextProvider", "LoadingService", function(t, i, e, n, r, a, o, s, u, c) {
        e = e.submissionId;
        u.headerURL = "projects/templates/share-review-header.tmpl.html", c.setLoading(!0);
        n = n.fetch(e).then(function(e) {
            return t.submission = e.data, i.all([r.fetchWithNanodegree(t.submission.project.id).then(function(e) {
                t.project = e.data
            }), a.fetch(t.submission.rubric_id, {
                params: {
                    for_eligible_grader: 0
                }
            }).then(function(e) {
                t.rubric = e.data
            })])
        }), e = s.allForSubmission(e).then(function(e) {
            e = e.data;
            t.critiquesAccessor = new o(e), t.doesNotMeetCount = _.filter(t.critiquesAccessor.getCritiques(), {
                result: "failed"
            }).length
        });
        i.all([n, e]).then(function() {
            c.setLoading(!1)
        })
    }]), angular.module("udacity.projects").controller("ShowCtrl", ["$stateParams", "$state", "$location", "RubricsModel", "SubmissionsModel", function(e, r, a, t, i) {
        t.fetch(e.rubricId, {
            params: {
                for_eligible_grader: 0
            }
        }).then(function(e) {
            var t = e.data;
            i.fetchMyLatestRubricSubmission(t.id).then(function(e) {
                e = e.data;
                ! function(e, t) {
                    var i = e.id,
                        n = {};
                    switch (t && t.status) {
                        case "completed":
                            return n.submissionId = t.id, r.go("reviews-show", n);
                        case "delaying_review":
                        case "processing":
                        case "awaiting_review":
                        case "in_review":
                        case "escalated":
                            return n.rubricId = i, r.go("rubrics.in-review", n);
                        case "canceled":
                        default:
                            return n.rubricId = i, r.go("rubrics.start", n)
                    }
                    a.path(void 0)
                }(t, e)
            })
        }, function() {
            a.path("/error")
        })
    }]), angular.module("udacity.projects").controller("ShowReviewCtrl", ["$rootScope", "$scope", "$state", "$location", "$stateParams", "$q", "$uibModal", "$window", "store", "UsersModel", "ProjectsModel", "EntitlementsModel", "EnrollmentsModel", "ProjectRatingModel", "RubricsModel", "SubmissionsModel", "StudentFeedbacksModel", "CritiquesModel", "CritiquesAccessor", "ContentsModel", "LoadingService", "CodeReviewService", "$translate", "CLASSROOM_URL", function(t, n, r, a, e, o, i, s, u, c, l, d, m, p, f, h, g, b, v, y, w, C, S, R) {
        var U, A, M = null,
            I = e.submissionId,
            $ = "hasViewedResubmissionVideo";

        function E() {
            if (!n.showStudentFeedback) return o.resolve();
            i.open({
                templateUrl: "projects/templates/student-feedback-reaction-modal.tmpl.html",
                controller: "StudentFeedbackReactionModalCtrl",
                controllerAs: "ctrl",
                resolve: {
                    score: function() {
                        return null
                    },
                    submission: function() {
                        return n.submission
                    }
                }
            }).result.then(function() {
                n.showStudentFeedback = !1
            })
        }

        function k() {
            if (!n.showProjectRating) return o.resolve();
            i.open({
                templateUrl: "projects/templates/project-rating-reaction-modal.tmpl.html",
                controller: "ProjectRatingReactionModalCtrl",
                controllerAs: "ctrl",
                resolve: {
                    submission: function() {
                        return n.submission
                    },
                    project: function() {
                        return n.currentProject
                    }
                }
            }).result.then(function() {
                n.showProjectRating = !1
            })
        }

        function L(e) {
            return o.resolve().then(E).then(k).then(e || function() {})
        }
        w.setLoading(!0), c.fetch().then(function(e) {
            U = e.data, M = U.id;
            e = [];
            e.push(h.fetch(I).then(function(e) {
                if (e.data) {
                    var t, i = e.data;
                    return (n.submission = i).user_id === M && "completed" !== i.status && r.go("rubrics.in-review", {
                        rubricId: i.rubric_id
                    }), n.annotation_link = _.head(i.annotation_urls), o.all([(t = i.project.id, l.fetchWithNanodegree(t).then(function(e) {
                        n.currentProject = e.data
                    })), (e = i.rubric_id, f.fetch(e, {
                        params: {
                            for_eligible_grader: 0
                        }
                    }).then(function(e) {
                        n.currentRubric = e.data, n.hashtag = "" !== e.data.hashtag ? e.data.hashtag : "Nanodegree"
                    })), (t = i.id, b.allForSubmission(t).then(function(e) {
                        e = e.data;
                        n.critiquesAccessor = new v(e), n.hasFeedback = 0 < n.critiquesAccessor.getSections().length, n.doesNotMeetCount = _.filter(n.critiquesAccessor.getCritiques(), {
                            result: "failed"
                        }).length
                    })), (e = i.user_id, t = i.rubric_id, h.fetchUserSubmissions(e, t).then(function(e) {
                        n.pastReviews = e.data, n.showPastReviews = !_.every(n.pastReviews, function(e) {
                            return e.id === parseInt(I)
                        })
                    })), function(e, t) {
                        if (e && t.is_career) return c.fetchReviewer(e).then(function(e) {
                            n.hasMentor = !0, n.mentor = e.data, _.isNull(n.mentor.avatar_url) && (n.mentor.avatar_url = "https://s3-us-west-2.amazonaws.com/udacity-profiles/assets/default_profile_picture.png"), _.isNull(n.mentor.bio) && (n.mentor.bio = S.instant("This reviewer has not added a bio."))
                        })
                    }(i.grader_id, i.project), (t = i.project_id, d.fetchMyEntitlements(t, !0).then(function(e) {
                        n.hasActiveEntitlement = !_.isEmpty(e.data)
                    })), (i = i.enrollment_id) ? m.fetchEnrollment(i).then(function(e) {
                        n.enrollment = e.data
                    }).catch(function(e) {
                        403 !== e.status && console.warn(e)
                    }) : o.resolve(null)])
                }
                a.path("/error")
            })), e.push(y.all(I).then(function(e) {
                n.files = e.data, n.commentsCount = _.reduce(n.files, function(e, t) {
                    return e + t.comments_count
                }, 0)
            })), o.all(e).then(function() {
                var e;
                M === n.submission.user_id && (e = n.submission.id, g.fetchBySubmissionId(e).catch(function(e) {
                        n.showStudentFeedback = 404 === e.status && !!n.submission.result && !n.isUngradeable() && !!n.currentProject
                    }), e = n.submission, p.fetchBySubmissionId(e.id).catch(function(e) {
                        n.showProjectRating = 404 === e.status
                    }), t.$on("$stateChangeStart", function(e, t, i) {
                        (n.showStudentFeedback || n.showProjectRating) && (e.preventDefault(), L(function() {
                            n.showStudentFeedback = !1, n.showProjectRating = !1, r.go(t.name, i)
                        }))
                    })), n.showCode = 0 < C.filterSupportedFiles(n.files).length,
                    function() {
                        var e = null;
                        e = a.search().audit ? "audit" : a.search().plagiarismCase ? "plagiarismCase" : n.hasFeedback ? "feedback" : "code";
                        n.showTab(e)
                    }()
            }).finally(function() {
                w.setLoading(!1)
            })
        }), n.auditTabState = {}, n.plagiarismCaseTabState = {}, n.showTab = function(e) {
            A = e
        }, n.assignAudit = function() {
            confirm(S.instant("You are going to assign yourself an audit. Do you really want this?")) && h.createAudit(I).then(function() {
                r.go("reviews-show", {
                    submissionId: I,
                    audit: 1
                })
            })
        }, n.userCanCreateAudits = function() {
            return !1
        }, n.isCurrentTab = function(e) {
            return A === e
        }, n.shouldShowAssessmentFooter = function() {
            return !n.isUngradeable() && (n.showStudentFeedback || n.showProjectRating)
        }, n.isSubmissionGradedByCurrentUser = function() {
            return (n.submission && n.submission.grader_id) === M
        }, n.isSubmissionByCurrentUser = function() {
            return (n.submission && n.submission.user_id) === M
        }, n.isUngradeable = function() {
            return n.submission && "ungradeable" === n.submission.result
        }, n.isResubmittable = function() {
            return !!n.currentProject && (n.submission && n.isSubmissionByCurrentUser() && _.includes(["failed", "ungradeable"], n.submission.result))
        }, n.shouldShowResubmissionVideo = function() {
            return n.isResubmittable()
        }, n.displayReviewerBioModal = function() {
            return i.open({
                templateUrl: "projects/templates/reviewer-bio-modal.tmpl.html",
                controller: "ReviewerBioModalCtrl",
                controllerAs: "ctrl",
                resolve: {
                    mentor: function() {
                        return n.mentor
                    }
                }
            }).result.then(function() {}).catch(function() {})
        }, n.rateReview = function() {
            L()
        }, n.rateProject = function() {
            L()
        }, n.hasViewedResubmissionVideo = function() {
            return u.get($)
        }, n.showResubmissionVideo = function() {
            u.set($, !0), i.open({
                templateUrl: "projects/templates/resubmission-video-modal.tmpl.html",
                size: "lg",
                windowClass: "embedded-video-640x360"
            })
        }, n.showStudentFeedback = !1, n.showProjectRating = !1, n.goToClassroomPath = function() {
            var e = R + "/nanodegrees/" + n.submission.enrollment_node_key;
            L(function() {
                s.location.href = e
            })
        }, n.goToCareerPortal = function() {
            s.location.href = n.careerPortalUrl
        }, n.hashtag = ""
    }]), angular.module("udacity.projects").controller("StartCtrl", ["$scope", "$stateParams", "$state", "RubricsModel", "ProjectsModel", "LoadingService", "EntitlementsModel", function(e, t, i, n, r, a, o) {
        var s = this;
        s.rubricId = t.rubricId, s.rubricLanguage = "", s.projectName = null, s.uploadTypes = [], s.alternateRubrics = [], a.setLoading(!0), n.fetch(s.rubricId, {
            params: {
                for_eligible_grader: 0
            }
        }).then(function(e) {
            e = e.data;
            return s.projectName = e.project.name, s.rubricLanguage = e.language, 1 === e.upload_types.length ? s.redirectToSubmitMethod(e.upload_types[0]) : s.uploadTypes = e.upload_types, e
        }).then(function(e) {
            return e.project.entitlement_required ? o.check(e.project_id).then(function() {
                return e.id
            }) : e.id
        }).then(n.fetchAlternates).then(function(e) {
            s.alternateRubrics = e.data, a.setLoading(!1)
        }, function(e) {
            s.alternateRubrics = [], a.setLoading(!1)
        }), s.hasUploadType = function(e) {
            return 0 <= s.uploadTypes.indexOf(e)
        }, s.redirectToSubmitMethod = function(e) {
            var t = {
                rubricId: s.rubricId
            };
            "zip" === e ? i.go("rubrics.submit-zip", t) : "repo" === e ? i.go("rubrics.submit-repo", t) : "file" === e ? i.go("rubrics.submit-file", t) : "link" === e ? i.go("rubrics.submit-link", t) : "text" === e && i.go("rubrics.submit-text", t)
        }, s.redirectToDifferentRubric = function(e) {
            e !== s.rubricId && (e = {
                rubricId: e
            }, i.go("rubrics.start", e))
        }, s.displayLanguage = function(e) {
            return {
                "en-us": "English",
                es: "Español",
                "pt-br": "Português",
                "zh-cn": "中文",
                ar: "العربية"
            }[e || "en-us"] || e
        }
    }]), angular.module("udacity.projects").controller("StudentFeedbackReactionModalCtrl", ["$scope", "$uibModalInstance", "StudentFeedbacksModel", "submission", function(i, t, n, r) {
        var a = [],
            o = this,
            s = 0,
            e = [{
                key: "review_use",
                question: "feedback-modal.continued-learning-question",
                answers: {
                    frown: "feedback-modal.continued-learning-answer-frown",
                    neutral: "feedback-modal.continued-learning-answer-neutral",
                    happy: "feedback-modal.continued-learning-answer-happy"
                }
            }, {
                key: "review_clarity",
                question: "feedback-modal.review-easy-to-understand-question",
                answers: {
                    frown: "feedback-modal.review-easy-to-understand-frown",
                    neutral: "feedback-modal.review-easy-to-understand-neutral",
                    happy: "feedback-modal.review-easy-to-understand-happy"
                }
            }, {
                key: "review_detail",
                question: "feedback-modal.review-is-detailed-question",
                answers: {
                    frown: "feedback-modal.review-is-detailed-frown",
                    neutral: "feedback-modal.review-is-detailed-neutral",
                    happy: "feedback-modal.review-is-detailed-happy"
                }
            }, {
                key: "review_personal",
                question: "feedback-modal.review-is-personalized-question",
                answers: {
                    frown: "feedback-modal.review-is-personalized-frown",
                    neutral: "feedback-modal.review-is-personalized-neutral",
                    happy: "feedback-modal.review-is-personalized-happy"
                }
            }, {
                key: "review_unbiased",
                question: "feedback-modal.review-is-professional-question",
                answers: {
                    frown: "feedback-modal.review-is-professional-frown",
                    neutral: "feedback-modal.review-is-professional-neutral",
                    happy: "feedback-modal.review-is-professional-happy"
                }
            }];
        o.hoverValue = null, o.rating = null, o.getAllSteps = function() {
            return e
        }, o.getCurrentStep = function() {
            return o.getAllSteps()[s]
        }, o.getCurrentQuestion = function() {
            return this.getCurrentStep().question
        }, o.getAnswerText = function(e) {
            return this.getCurrentStep().answers[e]
        }, o.isLastStep = function() {
            return s === o.getAllSteps().length - 1
        }, o.isActiveStep = function(e) {
            return e === s
        }, o.isVisitedStep = function(e) {
            return e < s
        }, o.isUnrated = function() {
            return null === o.rating
        }, o.getNextStep = function() {
            a.push({
                rating: o.rating,
                key: o.getCurrentStep().key,
                question_text: o.getCurrentQuestion(),
                comment: o.comment
            }), o.rating = null, o.comment = "", o.isLastStep() || s++
        }, i.$watch("ctrl.rating", function(e, t) {
            0 === e && (i.ctrl.rating = t)
        }), o.submitFeedback = function() {
            o.getNextStep();
            var e = {
                responses: {
                    feedback: a,
                    version: "1.0.0"
                }
            };
            n.create(r.id, e).then(function() {
                t.close()
            }).catch(function() {
                t.close()
            })
        }
    }]), angular.module("udacity.projects").controller("SubmitLinkCtrl", ["$q", "$scope", "$stateParams", "$state", "SubmissionsModel", "RubricsModel", "UsersModel", "LoadingService", "EntitlementsModel", function(e, t, i, n, r, a, o, s, u) {
        var c = i.rubricId,
            l = this;
        l.user = {}, l.rubricId = c, l.submission = {}, l.isValid = !1;
        i = [];
        i.push(o.fetch().then(function(e) {
            l.user = e.data
        })), s.setLoading(!0), i.push(a.fetch(l.rubricId).then(function(e) {
            e = e.data;
            if (l.canaryEnabled = e.canary_enabled, l.canaryMetadata = e.canary_metadata, l.submission.language = e.language || "en-us", l.isCareer = e.project.is_career, e.project.entitlement_required) return u.check(e.project_id)
        })), i.push(r.fetchMyLatestRubricSubmission(c).then(function(e) {
            e = e.data;
            e && (l.url = e.url)
        })), e.all(i).finally(function() {
            s.setLoading(!1)
        }), t.$watch("ctrl.submission.url", function() {
            l.isValid = !!l.submission.url
        }), l.createSubmission = function() {
            return r.createWithUrl(c, l.submission).then(function() {
                var e = {
                    rubricId: c
                };
                n.go("rubrics.in-review", e)
            })
        }
    }]), angular.module("udacity.projects").controller("SubmitRepoCtrl", ["$scope", "$stateParams", "$state", "$q", "UsersModel", "SubmissionsModel", "RubricsModel", "LoadingService", "EntitlementsModel", function(e, t, i, n, r, a, o, s, u) {
        var c = "https://github.com/",
            l = t.rubricId,
            d = this;
        d.user = {}, d.rubricId = l, d.selectedRepoFullName = null, d.submission = {}, d.repos = [], d.isValid = !1, s.setLoading(!0);
        t = [];
        t.push(r.fetch().then(function(e) {
            d.user = e.data
        })), t.push(r.fetchRepos().then(function(e) {
            d.repos = e.data
        })), t.push(a.fetchMyLatestRubricSubmission(l).then(function(e) {
            e = e.data;
            e && (d.selectedRepoFullName = e.repo_url && e.repo_url.replace(c, ""))
        })), t.push(o.fetch(d.rubricId, {
            params: {
                for_eligible_grader: 0
            }
        }).then(function(e) {
            e = e.data;
            if (d.canaryEnabled = e.canary_enabled, d.canaryMetadata = e.canary_metadata, d.submission.language = e.language || "en-us", d.isCareer = e.project.is_career, e.project.entitlement_required) return u.check(e.project_id)
        })), n.all(t).finally(function() {
            s.setLoading(!1)
        }), e.$watch("ctrl.selectedRepoFullName", function() {
            d.isValid = !!d.selectedRepoFullName, d.submission.repo_url = d.isValid ? c + d.selectedRepoFullName : null
        }), d.hasRepos = function() {
            return !!(d.repos && 0 < d.repos.length)
        }, d.createSubmission = function() {
            return a.createWithRepo(l, d.submission).then(function() {
                var e = {
                    rubricId: l
                };
                i.go("rubrics.in-review", e)
            })
        }
    }]), angular.module("udacity.projects").controller("SubmitTextCtrl", ["$scope", "$q", "$stateParams", "$state", "$window", "SubmissionsModel", "RubricsModel", "UsersModel", "ErrorHelper", "EntitlementsModel", function(e, r, t, a, i, o, n, s, u, c) {
        var l = this,
            d = t.rubricId;
        l.user = {}, l.submission = {}, l.rubricId = d, l.isValid = !1, l.editing = !0, e.loading = !0;
        var m = [];
        m.push(s.fetch().then(function(e) {
            l.user = e.data
        })), m.push(n.fetch(d, {
            params: {
                for_eligible_grader: 0
            }
        }).then(function(e) {
            e = e.data;
            if (l.submission.language = e.language || "en-us", e.project.entitlement_required) return c.check(e.project_id)
        })), r.all(m).finally(function() {
            e.loading = !1
        });
        var p = t.template;
        l.syntax = "html", "md" === t.filetype && (l.syntax = "markdown"), _.isEmpty(p) || (l.text = p), _.isEmpty(t.filename) || (l.filename = t.filename), l.toggleEdit = function() {
            l.editing = !l.editing
        }, l.isValid = function() {
            return !_.isEmpty(l.text) && l.text !== p
        }, l.createSubmission = function() {
            l.fileErrorMessage = null;
            var e = "html" === l.syntax ? ".html" : ".md";
            if (_.isEmpty(l.filename) ? l.filename = "readme" + e : l.filename.toLowerCase().endsWith(e) || (l.filename += e), _.isEmpty(l.text)) return r.when();
            var t, i, n, i = (e = l.text, i = i || "\n", e && (t = ".{1," + (t = t || 75) + "}(\\s|$)" + ((n = n || !1) ? "|.{" + t + "}|.+$" : "|\\S+?(\\s|$)"), e.match(RegExp(t, "g")).join(i)));
            return o.createWithText(d, l.submission, l.filename, i).then(function() {
                var e = {
                    rubricId: d
                };
                a.go("rubrics.in-review", e)
            }).catch(function(e) {
                l.fileErrorMessage = u.translateResponse(e)
            })
        }
    }]), angular.module("udacity.projects").controller("SubmitZipCtrl", ["$q", "$scope", "$stateParams", "$state", "SubmissionsModel", "RubricsModel", "UsersModel", "LoadingService", "ErrorHelper", "EntitlementsModel", function(e, t, i, n, r, a, o, s, u, c) {
        t.zipImgSource = "/assets/images/upload-zip.svg", t.pdfImgSource = "/assets/images/upload-file.svg", t.archiveHeader = "Upload your archive";
        var l, d = {
                ext: ["zip"],
                accept: "application/zip,application/x-zip,application/x-zip-compressed"
            },
            m = {
                ext: ["pdf", "zip", "md", "html"],
                accept: "application/zip,application/x-zip,application/x-zip-compressed,application/pdf,text/markdown,text/x-markdown,text/html,.md"
            };
        "rubrics.submit-zip" === n.current.name ? (t.fileType = "archive", l = d.ext, t.acceptHeader = d.accept) : (t.fileType = "pdf", l = m.ext, t.acceptHeader = m.accept);
        var p = this;
        p.user = {}, p.submission = {}, p.rubricId = i.rubricId, p.rubric = null, p.isValid = !1, p.submitBtnText = "Submit", s.setLoading(!0);
        i = [];
        i.push(a.fetch(p.rubricId, {
            params: {
                for_eligible_grader: 0
            }
        }).then(function(e) {
            if (p.rubric = e.data, p.canaryEnabled = p.rubric.canary_enabled, p.canaryMetadata = p.rubric.canary_metadata, p.isCareer = p.rubric.project.is_career, p.submission.language = p.rubric.language || "en-us", p.rubric.entitlement_required) return c.check(p.rubric.project_id)
        })), i.push(o.fetch().then(function(e) {
            p.user = e.data
        })), e.all(i).finally(function() {
            s.setLoading(!1)
        }), t.$watch("ctrl.genericFiles", function() {
            p.fileErrorMessage = null, p.isValid = !1;
            var e = p.getSelectedFile();
            e && (e.size > 1024 * p.rubric.max_upload_size_mb * 1024 ? p.fileErrorMessage = u.fetchErrorMessage("zipfile:too_big") : (e = e.name.toLowerCase().split("."), -1 !== l.indexOf(e[e.length - 1]) ? p.isValid = !0 : p.fileErrorMessage = u.fetchErrorMessage("zipfile:bad_extension")))
        }), p.getSelectedFile = function() {
            return p.genericFiles && p.genericFiles[0]
        }, p.createSubmission = function() {
            p.fileErrorMessage = null;
            var e = p.getSelectedFile().name.toLowerCase().split("."),
                e = e[e.length - 1];
            return ("archive" === t.fileType || "zip" === e ? r.createWithZipFile(p.rubricId, p.submission, p.getSelectedFile()) : r.createWithFiles(p.rubricId, p.submission, [p.getSelectedFile()])).then(function() {
                var e = {
                    rubricId: p.rubricId
                };
                n.go("rubrics.in-review", e)
            }).catch(function(e) {
                p.fileErrorMessage = u.translateResponse(e)
            })
        }
    }]), angular.module("udacity.projects").directive("auditTab", function() {
        return {
            controller: "AuditTabCtrl",
            templateUrl: "projects/directives/audit-tab.tmpl.html",
            scope: {
                submission: "=",
                state: "="
            },
            restrict: "A"
        }
    }).controller("AuditTabCtrl", ["$scope", "$state", "$stateParams", "$uibModal", "$q", "CritiquesAccessor", "UsersModel", "AlertBoxService", "CritiquesModel", "AuditsModel", "SubmissionsModel", "ErrorHelper", function(n, t, e, i, r, a, o, s, u, c, l, d) {
        var m = null;

        function p(t) {
            var e;
            n.audit = t, n.isOnboardingAudit = !(!n.submission || !n.submission.training_id), (e = t) && (h(e) && !e.result || n.isStaff && e.result) ? u.allForAudit(t.id).then(function(e) {
                e = e.data;
                n.auditCritiquesAccessor = new a(e), n.auditEditable = h(t) && "in_review" === t.status, n.isAuditor = h(t), f("visible", !0), t.user_id === m && ((e = t).read_at || c.markAsRead(e.id))
            }) : (n.auditCritiquesAccessor = null, n.auditEditable = !1, f("visible", !1))
        }

        function f(e, t) {
            n.state && (n.state[e] = t)
        }

        function h(e) {
            return e.grader_id === m
        }
        o.fetch().then(function(e) {
            m = e.data.id, n.isStaff = "staff" === e.data.role
        }), n.audit = null, n.submissionAudits = [], n.selectedAuditContainer = {
            audit: null
        }, n.isAuditor = !1, n.auditCritiquesState = {
            audit: !0
        }, n.unassignAudit = function() {
            return c.unassign(n.audit.id).then(function() {
                s.setNextMessage("Audit successfully unassigned."), t.go("submissions.dashboard")
            })
        }, n.confirmSubmitAudit = function() {
            return i.open({
                templateUrl: "projects/templates/confirm-audit-modal.tmpl.html"
            }).result.then(function() {
                return n.submitAudit()
            }, function() {
                return !0
            })
        }, n.submitAudit = function() {
            return n.auditEditable = !1, c.submit(n.audit.id).then(function() {
                s.setNextMessage("Audit successfully submitted."), t.go("submissions.dashboard", {
                    submitted: !0
                })
            })
        }, n.reviseReview = function() {
            return l.reviseReview(e.submissionId).then(function(e) {
                t.go("submissions.show", {
                    submissionId: e.data.id
                })
            }, function(e) {
                alert(d.translateResponse(e.data))
            })
        }, n.isComplete = function() {
            return !n.auditCritiquesState.editing
        }, n.onAuditSelectChange = function() {
            p(n.selectedAuditContainer.audit)
        }, n.$watch("submission", function() {
            n.submission ? c.fetchAllBySubmissionId(n.submission.id, {
                passthrough403: !0
            }).then(function(e) {
                const t = e.data || [];
                if (t.length <= 0) p(null);
                else {
                    const i = n.isStaff ? t : t.filter(h);
                    i.length < 0 ? p(null) : (e = i.map(function(e) {
                        return c.fetch(e.id)
                    }), r.all(e).then(function(e) {
                        e = e.map(function(e) {
                            return e.data
                        });
                        n.submissionAudits = e, n.selectedAuditContainer.audit = e[0], p(e[0])
                    }, function() {
                        p(null)
                    }))
                }
            }, function() {
                p(null)
            }) : p(null)
        })
    }]), angular.module("udacity.projects").directive("createSubmissionForm", function() {
        return {
            controller: "CreateSubmissionFormCtrl",
            controllerAs: "ctrl",
            templateUrl: "projects/directives/create-submission-form.tmpl.html",
            transclude: !0,
            scope: {
                submission: "=",
                rubricId: "=",
                githubRequired: "=",
                transclusionValid: "=",
                submit: "&",
                submitBtnText: "=",
                canaryEnabled: "=",
                canaryMetadata: "=",
                isCareer: "="
            },
            restrict: "A"
        }
    }).controller("CreateSubmissionFormCtrl", ["$scope", "$q", "$location", "SubmissionsModel", "CritiquesModel", "UsersModel", "RubricsModel", "RubricItemsModel", "ErrorHelper", "$translate", function(i, e, t, n, r, a, o, s, u, c) {
        var l = this;
        l.submission = i.submission, l.submitBtnText = i.submitBtnText, l.myWorkTermsAccepted = !1, l.attributionTermsAccepted = !1, l.plagiarismTermsAccepted = !1, l.visibilityTermsAccepted = !1, l.unitTestAnswer = null, l.warningClass = "test-warning-hidden", l.errorClass = "test-warning-hidden", l.idIncluded = !1, l.isLoading = !0, l.hasValidGithubToken = !1, l.githubRequired = i.githubRequired, l.optionalRubricItemsAttempted = null, l.optionalRubricItems = [], l.githubAuthRedirectPath = t.path(), l.studentNotes = "", l.intendedCareer = "", l.formErrors = [];
        t = [];
        l.githubRequired && t.push(a.fetchGithubAuthorization().then(function(e) {
            e = e.data;
            l.hasValidGithubToken = e.authorized
        })), t.push(s.allOptional(i.rubricId).then(function(e) {
            l.optionalRubricItems = e.data
        })), e.all(t).then(function() {
            l.isLoading = !1
        }), l.transitionTestWarning = function(e) {
            switch (e) {
                case "warning":
                    l.warningClass = "unit-tests-incomplete warning", l.errorClass = "test-warning-hidden";
                    break;
                case "error":
                    l.errorClass = "unit-tests-incomplete error", l.warningClass = "test-warning-hidden";
                    break;
                case "complete":
                default:
                    l.warningClass = "test-warning-hidden", l.errorClass = "test-warning-hidden"
            }
        }, l.isFormComplete = function(e) {
            return l.formErrors = l.getFormErrors(e), _.isEmpty(l.formErrors)
        }, l.getFormErrors = function(e) {
            const t = [];
            return e || t.push(c.instant("Provide valid project submission")), i.isCareer || _.isEmpty(l.optionalRubricItems) || ("yes" === l.optionalRubricItemsAttempted ? _.some(l.optionalRubricItems, {
                isSelected: !0
            }) || t.push(c.instant("Specify which optional features were attempted")) : null === l.optionalRubricItemsAttempted && t.push(c.instant("Specify whether optional features were attempted"))), i.canaryEnabled && "yes" !== l.unitTestAnswer && t.push(c.instant("Does not have passing unit tests")), i.isCareer ? (l.intendedCareer || t.push(c.instant("Specify desired role and industry")), l.studentNotes || t.push(c.instant("Specify additional career details")), l.visibilityTermsAccepted && l.plagiarismTermsAccepted || t.push(c.instant("Honor code not accepted"))) : l.myWorkTermsAccepted && l.attributionTermsAccepted && l.plagiarismTermsAccepted || t.push(c.instant("Honor code not accepted")), t
        }, l.formatStudentNotes = function(e, t) {
            var i = _.trim(l.studentNotes),
                n = _.trim(l.intendedCareer);
            return n ? c.instant("Desired Role: ") + n + "\r\n" + c.instant("Additional Details: ") + i : i
        }, l.submit = function() {
            var e;
            return l.submission.notes = l.formatStudentNotes(l.studentNotes, l.intendedCareer), l.errorMessage = null, l.submitBtnText = c.instant("Processing..."), l.optionalRubricItemsAttempted ? (e = _.map(_.filter(l.optionalRubricItems, {
                isSelected: !0
            }), "id"), l.submission.optional_rubric_items_attempted = e) : l.submission.optional_rubric_items_attempted = [], i.submit().catch(function(e) {
                l.errorMessage = u.translateResponse(e)
            }).finally(function() {
                l.submitBtnText = c.instant("Submit")
            })
        }, i.$watch("ctrl.optionalRubricItemsAttempted", function() {
            "no" === l.optionalRubricItemsAttempted && _.each(l.optionalRubricItems, function(e) {
                e.isSelected = !1
            })
        })
    }]), angular.module("udacity.projects").directive("githubAuth", ["$window", "UsersModel", "REVIEW_GITHUB_URL", function(i, e, n) {
        function t(t) {
            t.isLoading = !0, t.scrollToConnect = function() {
                $("html, body").animate({
                    scrollTop: $("#connecting-your-account").offset().top
                }, 200)
            }, e.fetch().then(_.bind(function(e) {
                e = e.data;
                t.githubAuthUrl = this.getGithubAuthUrl(e.id, t.redirectPath), t.isLoading = !1
            }, this))
        }
        return t.$inject = ["$scope"], t.prototype = {
            getGithubAuthUrl: function(e, t) {
                return n + "?user_id=" + e + "&redirect_path=" + i.encodeURIComponent(t)
            }
        }, {
            controller: t,
            templateUrl: "projects/directives/github-auth.tmpl.html",
            scope: {
                redirectPath: "@"
            },
            restrict: "EA"
        }
    }]), angular.module("udacity.projects").directive("plagiarismCaseTab", function() {
        return {
            controller: "PlagiarismCaseTabCtrl",
            templateUrl: "projects/directives/plagiarism-case-tab.tmpl.html",
            scope: {
                submission: "=",
                state: "="
            },
            restrict: "A"
        }
    }).controller("PlagiarismCaseTabCtrl", ["$scope", "$state", "$stateParams", "$uibModal", "$q", "CritiquesAccessor", "UsersModel", "AlertBoxService", "CritiquesModel", "PlagiarismCasesModel", "SubmissionsModel", "ErrorHelper", function(n, e, t, i, r, a, o, s, u, c, l, d) {
        var m = null;

        function p(t) {
            var e;
            n.plagiarismCase = t, (e = t) && (h(e) && !e.result || n.isStaff && e.result) ? u.allForPlagiarismCase(t.id).then(function(e) {
                e = e.data;
                n.plagiarismCaseCritiquesAccessor = new a(e), n.plagiarismCaseEditable = h(t) && "in_review" === t.status, n.isPlagiarismCaseReviewer = h(t), f("visible", !0)
            }) : (n.plagiarismCaseCritiquesAccessor = null, n.plagiarismCaseEditable = !1, f("visible", !1))
        }

        function f(e, t) {
            n.state && (n.state[e] = t)
        }

        function h(e) {
            return e.grader_id === m
        }
        o.fetch().then(function(e) {
            m = e.data.id, n.isStaff = "staff" === e.data.role
        }), n.plagiarismCase = null, n.submissionPlagiarismCases = [], n.selectedPlagiarismCaseContainer = {
            plagiarismCase: null
        }, n.isPlagiarismCaseReviewer = !1, n.plagiarismCaseCritiquesState = {
            plagiarismCase: !0
        }, n.unassignPlagiarismCase = function() {
            return c.unassign(n.plagiarismCase.id).then(function() {
                s.setNextMessage("Plagiarism case successfully unassigned."), e.go("submissions.dashboard")
            })
        }, n.confirmSubmitPlagiarismCase = function() {
            return i.open({
                templateUrl: "projects/templates/confirm-plagiarism-case-modal.tmpl.html"
            }).result.then(function() {
                return n.submitPlagiarismCase()
            }, function() {
                return !0
            })
        }, n.submitPlagiarismCase = function() {
            return n.plagiarismCaseEditable = !1, c.submit(n.plagiarismCase.id).then(function() {
                s.setNextMessage("Plagiarism case successfully submitted."), e.go("submissions.dashboard", {
                    submitted: !0
                })
            })
        }, n.isComplete = function() {
            return !n.plagiarismCaseCritiquesState.editing
        }, n.onPlagiarismCaseSelectChange = function() {
            p(n.selectedPlagiarismCaseContainer.plagiarismCase)
        }, n.$watch("submission", function() {
            n.submission ? c.fetchAllBySubmissionId(n.submission.id, {
                passthrough403: !0
            }).then(function(e) {
                const t = e.data || [];
                if (t.length <= 0) p(null);
                else {
                    const i = n.isStaff ? t : t.filter(h);
                    i.length < 0 ? p(null) : (e = i.map(function(e) {
                        return c.fetch(e.id)
                    }), r.all(e).then(function(e) {
                        e = e.map(function(e) {
                            return e.data
                        });
                        n.submissionPlagiarismCases = e, n.selectedPlagiarismCaseContainer.plagiarismCase = e[0], p(e[0])
                    }, function() {
                        p(null)
                    }))
                }
            }, function() {
                p(null)
            }) : p(null)
        })
    }]), angular.module("udacity.projects").directive("rubricItemsSelector", function() {
        return {
            templateUrl: "projects/directives/rubric-items-selector.tmpl.html",
            scope: {
                rubricItems: "="
            },
            restrict: "A"
        }
    }), angular.module("udacity.projects").directive("rubricTable", function() {
        return {
            controller: "RubricTableCtrl",
            controllerAs: "ctrl",
            templateUrl: "projects/directives/rubric-table.tmpl.html",
            scope: {
                rubric: "=",
                settings: "=",
                onCompletedChange: "<?",
                onOptionalCompletedChange: "<?"
            },
            restrict: "A"
        }
    }).controller("RubricTableCtrl", ["$scope", "$translate", "marked", function(i, r, a) {
        i.criteriaCompleted = {}, i.allCompleted = !1, i.optionalItemsCompleted = {}, i.$watch("rubric", function() {
            i.criteriaCompleted = {}, i.allCompleted = !1, i.optionalItemsCompleted = {}, i.rubric && i.rubric.sections.forEach(function(e) {
                e.rubric_items.forEach(function(e) {
                    i.criteriaCompleted[e.criteria] = !1
                })
            })
        }), i.onCheckboxParentClick = function(e, t) {
            "TD" === e.target.tagName && (i.criteriaCompleted[t.criteria] = !i.criteriaCompleted[t.criteria], i.updateCompleted(t))
        }, i.updateCompleted = function(e) {
            e.optional && (i.criteriaCompleted[e.criteria] ? i.optionalItemsCompleted[e.criteria] = e : delete i.optionalItemsCompleted[e.criteria], i.onOptionalCompletedChange && i.onOptionalCompletedChange(Object.values(i.optionalItemsCompleted)));
            e = i.rubric.sections.every(function(e) {
                return e.rubric_items.every(function(e) {
                    return i.criteriaCompleted[e.criteria] || e.optional
                })
            });
            i.onCompletedChange && e !== i.allCompleted && i.onCompletedChange(e), i.allCompleted = e
        }, i.localize = function(e, t, i) {
            if (e) {
                var n = e.translations,
                    t = n && n[r.use()] && n[r.use()][t] || e[t];
                return i && t ? a(t) : t
            }
        }
    }]), angular.module("udacity.submissions").directive("socialShare", function() {
        return {
            templateUrl: "projects/directives/social-share.tmpl.html",
            scope: {
                buttonHashtag: "=",
                userType: "=",
                prompt: "=",
                text: "=",
                url: "="
            },
            controller: "SocialShareController",
            restrict: "A"
        }
    }).controller("SocialShareController", ["$scope", function(t) {
        t.showTwitterPopup = function() {
            var e = [];
            t.buttonHashtag && e.push(["hashtags", t.buttonHashtag]), t.text && e.push(["text", t.text]), t.url && e.push(["url", t.url]);
            e = "http://twitter.com/intent/tweet?" + e.map(function(e) {
                return e[0] + "=" + encodeURIComponent(e[1])
            }).join("&");
            analytics.track("Review Tweeted", {
                hashtag: t.buttonHashtag,
                tweeted_by: t.userType
            }, t.$root.segmentPageProperties), t.showPopup(e)
        }, t.showFacebookPopup = function() {
            var e = "http://facebook.com/sharer/sharer.php?u=" + encodeURIComponent(t.url);
            analytics.track("Review Shared", {
                shared_by: t.userType
            }, t.$root.segmentPageProperties), t.showPopup(e)
        }, t.showPopup = function(e) {
            var t = window.screenX + ($(window).width() - 575) / 2,
                t = "status=1,width=575,height=400,top=" + (window.screenY + ($(window).height() - 400) / 2) + ",left=" + t;
            window.open(e, "social-share", t)
        }
    }]), angular.module("udacity.submissions").controller("ApplyCtrl", ["$window", "MENTOR_DASHBOARD_URL", function(e, t) {
        e.location.assign(t + "/apply?services[]=reviews")
    }]), angular.module("udacity.submissions").controller("ConfirmFeedbackModalCtrl", ["$uibModalInstance", "$scope", function(e, t) {
        var i = this,
            n = !0;
        i.nominate = !1, i.nomination = {
            reason: ""
        }, i.submission = t.submission, i.submit = function() {
            e.close({
                nomination: i.nomination.reason
            })
        }, t.$watch("nominate", function() {
            i.nominate || (i.nomination.reason = "")
        }), i.isEditing = function() {
            return n
        }, i.toggleEdit = function() {
            n = !n
        }
    }]), angular.module("udacity.submissions").controller("DashboardCtrl", ["MENTOR_DASHBOARD_URL", function(e) {
        window.location.assign(e + "/reviews/overview#")
    }]), angular.module("udacity.submissions").controller("FooterCtrl", ["$scope", "UsersModel", "AGREEMENT_URL", "HANDBOOK_URL", function(t, e, i, n) {
        e.fetch().then(function(e) {
            t.currentUser = e.data
        }), t.agreementUrl = i, t.handbookUrl = n
    }]), angular.module("udacity.submissions").controller("ProjectsSelectorCtrl", ["$window", "MENTOR_DASHBOARD_URL", function(e, t) {
        e.location.assign(t + "/update")
    }]), angular.module("udacity.submissions").controller("QualitySpecificationsCtrl", ["CODE_AUDIT_RUBRIC_ID", "NOCODE_AUDIT_RUBRIC_ID", "$stateParams", function(e, t, i) {
        var n = this;
        n.codeAuditRubricId = e, n.noCodeAuditRubricId = t, n.noCodeAuditRubricId === parseInt(i.id) ? n.tabName = "noCode" : n.tabName = "withCode", n.showTab = function(e) {
            n.tabName = e
        }, n.isSelectedTab = function(e) {
            return n.tabName === e
        }
    }]), angular.module("udacity.submissions").controller("SubmissionDetailsCtrl", ["$q", "$scope", "$location", "$stateParams", "$state", "$uibModal", "store", "SubmissionsModel", "RubricsModel", "CritiquesModel", "CritiquesAccessor", "ContentsModel", "LoadingService", "AlertBoxService", "SmyteService", "ErrorHelper", "CodeReviewService", "UsersModel", "GlobalAlertsService", "$window", "MENTOR_DASHBOARD_URL", "CATO_URL", "REVIEWS_V2_URL", "ReviewerToolkitModel", "$translate", function(a, o, e, t, i, n, r, s, u, c, l, d, m, p, f, h, g, b, v, y, w, C, S, R, U) {
        var A = t.submissionId;
        o.TOOLKIT_VIEW_TIME = "TOOLKIT_VIEW_TIME", m.setLoading(!0);
        var M, t = [],
            I = a.defer(),
            E = a.defer(),
            k = a.defer();

        function L() {
            var e = o.userIsInstructor() ? U.instant("Cato") : U.instant("Mentor Dashboard");
            p.setNowMessage(U.instant("Review successfully submitted. Redirecting back to") + " " + e + "...", {
                timeout: 3e3
            });
            var t = o.userIsInstructor() ? C + "/reviews/" : w + "/reviews/overview";
            setTimeout(function() {
                y.location.assign(t)
            }, 3500)
        }
        t.push(b.fetch().then(function(e) {
            M = e.data, v.displayAnyTermsAlerts(M)
        })), t.push(d.all(A).then(function(e) {
            o.files = e.data
        })), t.push(I.promise), t.push(E.promise), s.fetch(A).then(function(e) {
            var t = e.data,
                e = t.annotation_urls;
            e && e.length && (i = e[0].split("/"), o.pdfName = i[i.length - 1] + " " + U.instant("(Saved)")), t.url && 0 !== t.url.trim().toLowerCase().indexOf("http") && (t.url = "http://" + t.url.trim()), o.submission = t, o.showLink = !!t.url, u.fetch(t.rubric_id, {
                params: {
                    for_eligible_grader: 1
                }
            }).then(function(e) {
                o.currentRubric = e.data, o.currentProject = o.currentRubric.project, o.currentTab = o.currentProject.is_cert_project ? "resources" : "", E.resolve(o.currentRubric)
            }), R.fetch(t.project.id, t.language).then(function(e) {
                e = e.data;
                e && (o.toolkit_updated_at = e.updated_at, o.toolkit_url = e.archive_url, o.refreshToolkitBadgeVisibility()), k.resolve(e)
            });
            var n, r, i = [];
            i.push(s.fetchUserSubmissions(t.user_id, t.rubric_id).then(function(e) {
                o.pastReviews = e.data, o.showPastReviews = _.some(o.pastReviews, function(e) {
                    return e.id !== parseInt(A)
                }), o.latestReview = _.every(o.pastReviews, function(e) {
                    return e.id <= parseInt(A)
                });
                var t = _.findIndex(o.pastReviews, function(e) {
                        return e.id === o.submission.id
                    }),
                    i = t + 1 + _.findIndex(o.pastReviews.slice(t + 1), function(e) {
                        return "failed" === e.result
                    });
                n = i <= t ? -1 : e.data[i].id
            })), i.push(c.allForSubmission(A).then(function(e) {
                r = e.data, _.some(r, "autograded") && p.setNowMessage(U.instant("We've graded some rubric points for this submission. Check the Project Review tab before you start!"), {
                    timeout: !1
                })
            })), a.all(i).finally(function() {
                if (-1 !== n) return c.allForSubmission(n).then(function(e) {
                    var i = e.data;
                    _.each(r, function(t) {
                        var e = _.find(i, function(e) {
                            return e.rubric_item_id === t.rubric_item_id && e.created_at > t.rubric_item.updated_at
                        });
                        e && (t.prev_result = e.result, t.prev_observation = e.observation)
                    })
                })
            }).then(function() {
                o.critiquesAccessor = new l(r), o.hasCritiques = 0 < r.length, I.resolve(o.submission)
            }).catch(console.error)
        }), o.updateToolkitLastView = function() {
            r.set(o.TOOLKIT_VIEW_TIME, moment().valueOf()), o.refreshToolkitBadgeVisibility()
        }, o.getToolkitLastView = function() {
            return r.get(o.TOOLKIT_VIEW_TIME)
        }, o.refreshToolkitBadgeVisibility = function() {
            o.isToolkitBadgeVisible = null === o.getToolkitLastView() || moment(o.getToolkitLastView()) < moment(o.toolkit_updated_at)
        }, o.updatedOnText = function() {
            return moment(o.toolkit_updated_at).format("dddd, MMMM Do, YYYY, h:mm:ss a")
        }, o.isCodeShown = function() {
            return o.submission && !o.submission.url && o.files && 0 < g.filterSupportedFiles(o.files).length
        }, o.isAnnotationShown = function() {
            if (!o.submission) return !1;
            if (o.submission.url) return !0;
            var e = _.keyBy(o.files, function(e) {
                e = e.path.toLowerCase().split(".");
                return e[e.length - 1]
            });
            return !!_.has(e, "pdf") || !!_.has(e, "docx")
        }, a.all(t).finally(function() {
            return "staff" != M.role && o.submission.grader_id != M.id ? e.path("/reviews/" + o.submission.id) : (m.setLoading(!1), void("in_review" === o.submission.status && f.log(f.SUBMISSION_REVIEWING, {
                id: A
            })))
        }), o.critiquesState = {}, o.showTab = function(e) {
            o.currentTab = e
        }, o.isSubmissionCompleted = function() {
            return o.submission && "completed" === o.submission.status
        }, o.hasPlagiarizedSubmission = function() {
            return _.some(o.pastReviews, {
                is_demerit: !0,
                ungradeable_tag: "plagiarism"
            }) || _.some(o.pastReviews, {
                plagiarism_judgement: "confirmed"
            })
        }, o.confirmUnassign = function() {
            n.open({
                templateUrl: "submissions/templates/confirm-unassign-modal.tmpl.html"
            }).result.then(function() {
                return o.unassign()
            })
        }, o.unassign = function() {
            s.unassignSubmission(A).then(function() {
                e.path("/submissions/dashboard")
            })
        }, o.confirmEvaluationSubmit = function() {
            return n.open({
                templateUrl: "submissions/templates/confirm-feedback-modal.tmpl.html",
                controller: "ConfirmFeedbackModalCtrl",
                controllerAs: "ctrl",
                scope: o,
                size: "submit-confirm"
            }).result.then(function(e) {
                return o.submitEvaluation(e)
            }, function() {
                return !0
            })
        }, o.userIsInstructor = function() {
            return !(!M || "instructor" !== M.role)
        }, o.submitEvaluation = function(e) {
            return s.submitFeedback(A, e).then(function() {
                L()
            })
        }, o.showUngradeableModal = function() {
            n.open({
                templateUrl: "submissions/templates/ungradeable-modal.tmpl.html",
                size: "lg",
                controller: "UngradeableModalCtrl",
                controllerAs: "ctrl",
                resolve: {
                    submission: o.submission,
                    project: o.currentProject
                }
            }).result.then(function() {
                L()
            })
        }, o.moveToAdditionalComment = function() {
            var e = $("#generalComment");
            o.currentTab = "feedback", setTimeout(function() {
                $("html, body").animate({
                    scrollTop: e.offset().top
                }, 500), e.find("textarea").first().focus()
            }, 50)
        }, o.$watch("pdfFile", function() {
            o.pdfErrorMessage = null, o.pdfName = null;
            var e, t = _.head(o.pdfFile);
            t && (e = 0, o.files && (e = _.max(_.map(o.files, function(e) {
                var t = e.path.lastIndexOf(".");
                if (-1 === t) return 0;
                t = e.path.slice(t);
                return _.includes([".pdf", ".docx"], t) ? e.size : 0
            }))), 10485760 < t.size - e ? o.pdfErrorMessage = h.fetchErrorMessage("annotations:too_big") : "pdf" === (e = t.name.toLowerCase().split("."))[e.length - 1] ? (o.pdfName = t.name + " " + U.instant("(Uploading...)"), s.uploadAnnotations(A, [t]).then(function() {
                o.pdfName = t.name + " " + U.instant("(Saved)")
            })) : o.pdfErrorMessage = h.fetchErrorMessage("annotations:bad_extension"))
        })
    }]), angular.module("udacity.submissions").controller("SubmissionStartCtrl", ["$location", "UsersModel", function(t, e) {
        e.fetch().then(function(e) {
            e.data.accepted_terms ? t.path("/submissions/dashboard") : t.path("/submissions/apply")
        })
    }]), angular.module("udacity.submissions").controller("UngradeableModalCtrl", ["$uibModalInstance", "SubmissionsModel", "submission", "project", function(e, t, i, n) {
        var r = this;
        r.notes = "", r.reasons = [{
            tag: "missing_requirements",
            text: "Missing Requirements"
        }, {
            tag: "language",
            text: "Submission in the wrong language"
        }, {
            tag: "abuse",
            text: "Abusive language or conduct"
        }, {
            tag: "plagiarism",
            text: "Plagiarism"
        }], r.selectedReason = r.reasons[0], r.project = n;
        var a = !0;
        r.submit = function() {
            t.ungradeable(i.id, r.notes, r.selectedReason.tag, r.plagiarismSourceUrl).then(function() {
                e.close()
            })
        }, r.isEditing = function() {
            return a
        }, r.toggleEdit = function() {
            a = !a
        }, r.incomplete = function() {
            return !r.notes || !r.selectedReason
        }, r.shownToStudent = function() {
            return ["plagiarism", "missing_requirements"].includes(r.selectedReason.tag)
        }
    }]), angular.module("udacity.submissions").controller("VoteFeedbackModalCtrl", ["$scope", "SubmissionsModel", "ErrorHelper", function(t, i, n) {
        var r = this;
        r.submissionId = t.voteInProgress.submissionId, r.newValue = t.voteInProgress.newValue, r.placeholder = 1 === r.newValue ? "Why did you like this review?" : "What should this reviewer do to improve?", r.submit = function() {
            var e = t.votes[r.submissionId].feedback;
            i.postVote(r.submissionId, r.newValue, e).then(function(e) {
                t.votes[r.submissionId] = {
                    value: e.data.value,
                    feedback: e.data.feedback
                }, _.defer(function() {
                    t.$apply()
                })
            }).catch(function(e) {
                t.erred(n.translateResponse(e))
            }).finally(function() {
                t.$close()
            })
        }
    }]), angular.module("udacity.submissions").directive("auditsList", function() {
        return {
            templateUrl: "submissions/directives/audits-list.tmpl.html",
            scope: {
                audits: "="
            },
            restrict: "A"
        }
    }), angular.module("udacity.submissions").directive("certificationStatus", function() {
        return {
            templateUrl: "submissions/directives/certification-status.tmpl.html",
            scope: {
                certification: "="
            },
            restrict: "A"
        }
    }), angular.module("udacity.submissions").directive("certificationView", function() {
        return {
            templateUrl: "submissions/directives/certification-view.tmpl.html",
            scope: {
                certificationId: "=",
                reviewerOnboardingUnlocked: "="
            },
            controller: "CertificationViewController",
            restrict: "A"
        }
    }).controller("CertificationViewController", ["$scope", "$state", "$q", "COURSE_BASE_URL", "CertificationsModel", "UsersModel", "OnboardingsModel", "$translate", function(i, t, e, n, r, a, o, s) {
        i.ONBOARDING_TIME_LIMIT_MESSAGE = s.instant("You must complete the onboarding review within 12 hours of starting it."), i.moment = window.moment, i.certification = null, i.loading = !0;
        r = r.fetch(i.certificationId);
        r.then(function(e) {
            if (i.certification = e.data, _.isEmpty(i.certification.trainings)) {
                i.certification.trainings = [];
                for (var t = 0; t < Math.max(1, i.certification.trainings_count); t++) i.certification.trainings.push({
                    status: "locked"
                })
            }
        }), e.all({
            certifications: r
        }).then(function() {
            i.loading = !1, i.onboardingLocked = !i.reviewerOnboardingUnlocked
        }), i.start = function(e) {
            return o.attempt(e).then(function(e) {
                e = e.data, e = e, e = _.find(e.training_submissions, {
                    status: "in_review"
                });
                t.go("submissions.show", {
                    submissionId: e.id
                })
            })
        }, i.submitProjectUrl = function(e) {
            return t.href("rubrics.start", {
                rubricId: e.rubric_id_for_prospective_graders
            })
        }, i.isCertified = function() {
            return _.includes(["certified", "inactive"], i.certification.status)
        }
    }]), angular.module("udacity.submissions").directive("studentFeedbacksList", ["StudentFeedbacksModel", function(e) {
        return {
            templateUrl: "submissions/directives/student-feedbacks-list.tmpl.html",
            scope: {
                allReadCallback: "&"
            },
            restrict: "A",
            controller: "StudentFeedbacksListCtrl",
            controllerAs: "ctrl"
        }
    }]).controller("StudentFeedbacksListCtrl", ["$q", "$scope", "$timeout", "StudentFeedbacksModel", function(i, n, t, r) {
        var a = this;

        function o() {
            var e, e = (e = a.studentFeedbacks, _.chain(e).filter(function(e) {
                    return !e.read_at
                }).map("id").value()),
                t = [];
            _.each(e, function(e) {
                t.push(r.markAsRead(e).then(function(e) {
                    n.isUpdating = !0;
                    e = e.data;
                    _.chain(a.studentFeedbacks).find({
                        id: e.id
                    }).extend(e).value()
                }))
            }), n.allReadCallback && i.all(t).then(function() {
                n.allReadCallback()
            })
        }
        a.studentFeedbacks = [], a.loading = !0, r.all().then(function(e) {
            a.studentFeedbacks = e.data, a.loading = !1, t(o, 3e3)
        })
    }]), angular.module("udacity.submissions").filter("submissionAssignmentTimeRemaining", function() {
        return function(e) {
            var t = window.moment,
                e = t(e.assigned_at).add(12, "h");
            return e.isAfter(t()) ? e.fromNow() : "0m"
        }
    }), angular.module("udacity.submissions").filter("onboardingStatusLabel", function() {
        var t = {
            passed: "Completed",
            in_audit: "Submitted, pending audit"
        };
        return function(e) {
            return t[e]
        }
    });
! function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("common/directives/alert-box.tmpl.html", '<div class="row row-gap-medium" ng-show="!!message && !dismissed" ng-class="{fadeInDown: !!message, fadeOutUp: dismissed, animated: !!message || dismissed}"> <div class="col-md-offset-2 col-md-8"> <div class="alert {{alertClass}} hr-slim"> <button type="button" ng-click="dismiss()" class="close" aria-label="Close"> <span aria-hidden="true">×</span> </button> <span ng-bind-html="message"></span> </div> </div> </div> ')
    }])
}(),
function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("common/directives/code-comment.tmpl.html", '<div class="comment-container {{category}}"> <ng-form name="commentForm"> <div ng-hide="editing" class="comment-viewer"> <div class="comment clearfix"> <div class="pill pill-{{category}}"><span translate="">{{ renameCategories(category) }}</span></div> <div class="inline-comment" marked="body"></div> </div> <div ng-if="editable"> <div class="row row-gap-small"></div> <button ng-click="startEdit()" type="button" class="btn btn-default">{{ \'Edit\' | translate }}</button> </div> </div> <div ng-show="editing" class="comment-editor"> <div class="category-inputs"> <label ng-repeat="categoryInfo in categories"> <input type="radio" required="" name="category" ng-model="modifiedComment.category" ng-value="categoryInfo.value"> &nbsp; {{ categoryInfo.label | translate }} </label> </div> <div ng-if="!!modifiedComment.category"> <div class="form-group"> <div class="row row-gap-small"></div> <div markdown-textarea="" form="commentForm"> <textarea rows="4" required="" class="form-control" type="text" name="comment" ng-model="modifiedComment.body" placeholder="Write something about this line of code...">{{ body }}</textarea> </div> </div> <div class="row row-buttons"> <div class="col-xs-12"> <button type="button" class="btn btn-primary" busy-click="submitComment()" ng-disabled="commentForm.$invalid"> <span class="glyphicon glyphicon-ok"></span>&nbsp; <span translate="Save & Preview"></span> </button> <button ng-if="!isNewComment()" type="button" class="btn btn-default" ng-click="deleteComment()"> <span class="glyphicon glyphicon-trash"></span>&nbsp; {{ \'Delete\' | translate }} </button> <button type="button" class="btn btn-default" ng-click="cancelComment()">{{ \'Cancel\' | translate }}</button> </div> </div> </div> </div> </ng-form> </div> ')
    }])
}(),
function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("common/directives/code-review.tmpl.html", '<div ng-show="allowComments"> <input type="text" class="form-control" ng-model="filterPattern" placeholder="{{ \'File filter (e.g. “readme.md”, “.css”, “src/lib/*.js”)\' | translate }}" aria-label="{{ \'File filter\' | translate }}"> <div class="row row-gap-small"></div> </div> <div class="code-section-item" ng-repeat="file in files" ng-show="isFileVisible(file)"> <div class="code-section-item-title" ng-click="setCurrentFileIndex($index)"> <small> <span ng-class="{\'glyphicon-triangle-right\': currentFileIndex !== $index, \'glyphicon-triangle-bottom\': currentFileIndex === $index}" class="glyphicon"> </span> </small> <strong>{{file.path}}</strong> <span ng-if="file.comments_count > 0" class="badge badge-info text-center"> {{ file.comments_count }} </span> </div> <div class="code-section-item-body" ng-if="currentFileIndex === $index"> <div mirror="" file="file" allow-comments="allowComments"> </div> </div> </div> ')
    }])
}(),
function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("common/directives/critique-editor.tmpl.html", '<h3 class="h-slim" translate="">Specification</h3> <p marked="rubricItem.passed_description"></p> <div ng-if="rubricItem.reviewer_tips"> <span class="tip-label pull-left"><small translate="">Tip</small></span> <div single-line-collapse="rubricItem.reviewer_tips" preview-length="100"></div> </div> <ng-form name="form"> <div class="row result-label" ng-if="modifiedCritique.resultLocked"> <div class="col-sm-1"> <div class="result-spacing"> <span class="result-icon {{modifiedCritique.result}} text-center"></span> </div> </div> <div class="col-sm-10" translate="">A previous reviewer passed the student on this rubric item.</div> <div class="col-sm-1 text-center"> <img src="/assets/images/icon-lock.svg"> </div> </div> <div class="row" ng-if="!modifiedCritique.resultLocked"> <div class="col-md-12"> <label> <input required="" type="radio" name="result-{{critique.id}}" value="failed" ng-model="modifiedCritique.result" ng-click="toggleExceededRequirements(false)">&nbsp;&nbsp; {{ \'failed\' | resultLabel | translate }} </label> </div> </div> <div class="row" ng-if="!modifiedCritique.resultLocked"> <div class="col-md-12"> <label> <input required="" type="radio" name="result-{{critique.id}}" value="passed" ng-model="modifiedCritique.result" ng-click="toggleExceededRequirements(false)">&nbsp;&nbsp; {{ \'passed\' | resultLabel | translate }} </label> </div> </div> <div class="row" ng-if="isExceedable()"> <div class="col-md-12"> <label> <input required="" type="radio" name="result-{{critique.id}}" value="exceeded" ng-model="modifiedCritique.result" ng-click="toggleExceededRequirements(false)">&nbsp;&nbsp; {{ \'exceeded\' | resultLabel | translate }} </label> <div class="requirements-panel"> <p marked="rubricItem.exceeded_description" class="caption caption-small"></p> </div> </div> </div> <div ng-if="!!critique.prev_observation"> <div class="tip-label pull-left"><small translate="">Previous Feedback</small></div> <div class="row row-gap-small"></div> <p marked="critique.prev_observation"></p> </div> <div ng-if="!!modifiedCritique.result"> <div markdown-textarea=""> <div class="row row-gap-small"></div> <textarea ng-required="isObservationRequired()" class="form-control" name="assessment" rows="4" placeholder="{{ getPlaceholderText() }}" ng-model="modifiedCritique.observation" aria-label="Critique explaination">\n      </textarea> </div> <div class="row row-buttons"> <div class="col-xs-12"> <button type="button" class="btn btn-primary" busy-click="_submit()" ng-disabled="form.$invalid"> <span class="glyphicon glyphicon-ok"></span>&nbsp; <span translate="Save & Preview"></span> </button> <button type="button" class="btn btn-default" busy-click="_reset()"> <span class="glyphicon glyphicon-trash"></span>&nbsp; {{ \'Reset\' | translate }} </button> <button type="button" class="btn btn-default" ng-click="_cancel()"> {{ \'Cancel\' | translate }} </button> </div> </div> </div> </ng-form> <div class="row row-gap-small"></div> ')
    }])
}(),
function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("common/directives/critique-view.tmpl.html", '<div class="critique-view-header"> <div class="row result-label"> <div class="col-sm-1"> <div class="result-spacing"> <span ng-hide="isCareer" class="result-icon {{critique.result}} text-center"></span> </div> </div> <div class="col-xs-12 col-sm-10 critique-description" marked="rubricItem.passed_description"></div> <div class="col-sm-1 text-center" ng-if="editable && critiqueLocked()"> <img src="/assets/images/icon-lock.svg"> </div> </div> <div class="row row-gap-small" ng-if="editable && critiqueLocked()"> <div class="col-xs-12 col-md-10 col-md-offset-1"> <span class="tip-label pull-left"><small translate="">REVIEWER</small></span> <em>{{ \'We were able to automatically grade this rubric point.\' | translate }}</em> </div> </div> </div> <div ng-if="!!critique.observation" class="critique-view-body"> <div class="row"> <div class="col-xs-12 col-sm-10 col-sm-offset-1"> <div class="p-slim" marked="critique.observation"></div> </div> </div> </div> <div ng-if="editable && !critiqueLocked()"> <div class="row row-gap-small"> <div class="col col-xs-12 col-sm-offset-1 col-sm-10"> <button ng-click="editClicked()" class="btn btn-default"> <span class="glyphicon glyphicon-edit"></span>&nbsp; {{ \'Edit\' | translate }} </button> </div> </div> </div> ')
    }])
}(),
function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("common/directives/critiques-editor.tmpl.html", '<div ng-repeat="section in critiquesAccessor.getSections()"> <div section-critiques="" section="section" critiques="critiquesAccessor.getCritiques(section.id)" editable="editable" failed-required-placeholder="failedRequiredPlaceholder" passed-required-placeholder="passedRequiredPlaceholder" optional-placeholder="optionalPlaceholder" state="sectionCritiquesState[section.id]" is-career="isCareer"> </div> </div> <div class="row"> <div ng-if="!editable && submission.general_comment" class="col-xs-12 additional-reviewer-comment"> <strong translate="">Additional Reviewer Comments</strong> <p marked="submission.general_comment"></p> </div> </div> <div class="row"> <ng-form ng-if="!(state && (state.audit || state.plagiarismCase))" name="general-comment-form"> <div ng-if="editable" class="col-xs-12 additional-reviewer-comment" id="generalComment"> <div ng-if="!general_comment_editing"> <strong translate="">Additional Reviewer Comments</strong> <p class="p-slim" marked="submission.general_comment"></p> <div> <div class="row row-gap-small"></div> <button ng-click="startEditing()" class="btn btn-default">{{ \'Edit\' | translate }}</button> </div> </div> <div ng-if="general_comment_editing"> <label for="general-comment" translate="">Please provide the student with overall comments. This can also include general words of encouragement, a reply to comments in the student\'s notes, etc.</label> <div markdown-textarea=""> <textarea class="form-control" rows="4" ng-model="submission.general_comment" id="general-comment"></textarea> </div> <div class="row row-buttons"> <div class="col-xs-12"> <button class="btn btn-primary" busy-click="saveGeneralComment()" ng-disabled="!submission.general_comment"> <span class="glyphicon glyphicon-ok"></span>&nbsp; <span translate="Save & Preview"></span> </button> <button class="btn btn-default" busy-click="resetGeneralComment()" ng-disabled="!submission.general_comment"> <span class="glyphicon glyphicon-trash"></span>&nbsp;{{ \'Reset\' | translate }} </button> </div> </div> </div> </div> </ng-form> </div> <div class="row row-gap-small"></div> ')
    }])
}(),
function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("common/directives/loading-container.tmpl.html", '<div ng-show="loading" class="row"> <div class="col-sm-6 col-sm-offset-3 text-center"> <div class="row row-gap-huge"></div> <img src="/assets/images/loading.gif"> <div class="row row-gap-huge"></div> </div> </div> <div ng-show="!loading"> <div ng-transclude=""></div> </div> ')
    }])
}(),
function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("common/directives/markdown-textarea.tmpl.html", '<div ngf-drop="" ng-model="files" ngf-multiple="true" ngf-allow-dir="false" ngf-max-size="maxSize" ngf-accept="accept" accept="{{ accept }}" ngf-drag-over-class="{accept:\'dragover\', reject:\'dragover-reject\', delay:100}" class="drop-box"> <div ng-transclude=""></div> <p class="caption"> {{ \'Attach images (.png, .gif, .jpg) by dragging and dropping or selecting them (10 MB limit).\' | translate }} <a href="" ngf-select="" ngf-accept="accept" accept="{{ accept }}" ng-model="files" ngf-multiple="true"> {{ \'Browse files.\' | translate }} </a> <br> <a href="https://guides.github.com/features/mastering-markdown/" target="_blank">{{ \'Markdown supported.\' | translate }}</a> </p> <p ng-if="errorMessage" class="pull-left caption error"> {{ errorMessage }} </p> </div> ')
    }])
}(),
function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("common/directives/mirror.tmpl.html", '<div ng-show="isLoading" class="loading"> </div> <div class="code-mirror-holder" ui-codemirror="{ onLoad: codeMirrorLoaded }" ui-codemirror-opts="generateEditorOptions(file)" ng-hide="isLoading"> </div>')
    }])
}(),
function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("common/directives/reviews-list.tmpl.html", '<h2 class="review-list-name current-review-name h-slim"> <span ng-if="thisReview.status !== \'canceled\'"> {{ \'Review\' | translate }} #{{nonCanceledReviewIndexHash[thisReview.id]}} </span> <span ng-if="thisReview.status === \'canceled\'"> {{ \'Canceled Submission\' | translate }} </span> <span> ({{ \'this review\' | translate }})</span> </h2> <small class="text-muted" ng-if="thisReview.completed_at"> <span ng-if="thisReview.status !== \'canceled\'" translate="">Reviewed</span> <span ng-if="thisReview.status === \'canceled\'" translate="">Student canceled</span> <span> <span am-time-ago="thisReview.completed_at"></span></span> </small> <div ng-if="!thisReview.completed_at"> <small class="text-muted" translate="">Review in progress</small> </div> <div class="text-uppercase submission-notes-header" translate=""> student notes </div> <div class="submission-notes"> <span ng-if="thisReview.notes" marked="thisReview.notes"></span> <span ng-if="!thisReview.notes">{{ \'None provided\' | translate }}</span> </div> <hr ng-if="filteredReviews.length > 1"> <div ng-if="filteredReviews.length > 1" ng-repeat="review in filteredReviews"> <div class="row row-gap-small"> <div class="col-xs-7"> <span ng-if="review.status !== \'canceled\'"> <span ng-if="!(thisReview && thisReview.id === review.id)"> <a class="review-list-name" ui-sref="reviews-show({submissionId: review.id, audit: null})"> {{ \'Review\' | translate }} #{{nonCanceledReviewIndexHash[review.id]}} <span ng-if="review.previous_submission_id">({{ \'revision of prior review\' | translate}})</span> </a> <span class="reason-not-reviewing" ng-if="performedReview(review.id)"> {{ \'You reviewed this submission\' | translate }} </span> <span class="review-voting" ng-if="!performedReview(review.id) && review.user_id != user_id"> <button ng-class="[\'glyphicon glyphicon-thumbs-up upvote\', {\'upvoted\': votes[review.id].value == 1}]" ng-click="showVoteModal(review.id, 1)" title="Upvote previous submission. Give feedback by letting us know that this was a good review." aria-label="Upvote previous submission. Give feedback by letting us know that this was a good review."></button> <button ng-class="[\'glyphicon glyphicon-thumbs-down downvote\', {\'downvoted\': votes[review.id].value == -1}]" ng-click="showVoteModal(review.id, -1)" title="Downvote previous submission. Give feedback by letting us know that this was a bad review." aria-label="Downvote previous submission. Give feedback by letting us know that this was a bad review."></button> </span> </span> <span class="review-list-name" ng-if="!isCareer && thisReview && thisReview.id === review.id"> {{ \'This review\' | translate }} <span ng-if="review.previous_submission_id">({{ \'revision of prior review\' | translate }})</span> </span> </span> <span class="review-list-name" ng-if="review.status === \'canceled\'"> {{ \'Canceled Submission\' | translate }} </span> </div> </div> <div class="row"> <div ng-if="review.completed_at && !(isCareer && thisReview.id === review.id)" class="col-xs-12 text-muted"> <small> <span ng-if="review.status !== \'canceled\'" translate="">Reviewed</span> <span ng-if="review.status === \'canceled\'" translate="">Student canceled</span> <span> <span am-time-ago="review.completed_at"></span></span> </small> </div> <div ng-if="!review.completed_at" class="col-xs-12 text-muted"> <small translate="">Review in progress</small> </div> </div> </div> <div ng-if="errorMessage" scroll-if="errorMessage" class="row row-gap-medium"> <div class="alert alert-danger" ng-bind-html="errorMessage"> </div> </div> <div class="row row-gap-large"></div> ')
    }])
}(),
function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("common/directives/rubric-items-list.tmpl.html", '<div ng-repeat="section in rubricItemsAccessor.getSections()"> <div class="panel"> <div class="col-xs-12 bg-gray"> <div class="row row-gap-medium"></div> <h2 class="h-slim-top expandable expandable-pull-right" ng-class="{expanded: isExpanded(section.id)}" ng-click="toggleExpansion(section.id)"> {{ section.name }} </h2> <div ng-if="isExpanded(section.id)"> <div ng-repeat="rubricItem in rubricItemsAccessor.getRubricItems(section.id)"> <div class="col-xs-12 bg-white"> <h3 translate="">Specification</h3> <p marked="rubricItem.passed_description"></p> </div> <div class="row row-gap-medium"></div> </div> </div> <div class="row row-gap-medium"></div> </div> </div> <div ng-if="!$last" class="row row-gap-large"></div> </div> ')
    }])
}(),
function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("common/directives/section-critiques.tmpl.html", '<div> <div class="row row-gap-small"></div> <h2 class="section-name"> {{ section.name }} </h2> <div> <div ng-repeat="critique in critiques"> <div row="" row-gap-small="" col-xs-12="" bg-white="" scroll-if="isCurrentEditingCritique(critique.id)"> <div class="critique-container" critique-editor="" critique="critique" success="setEditingCritique(critique.id, !critique.result)" cancel="setEditingCritique(critique.id, !critique.result)" failed-required-placeholder="failedRequiredPlaceholder" passed-required-placeholder="passedRequiredPlaceholder" optional-placeholder="optionalPlaceholder" ng-if="isEditingCritique(critique.id)"> </div> <div class="critique-container" critique-view="" critique="critique" editable="editable" is-career="isCareer" edit-clicked="setEditingCritique(critique.id, true)" ng-if="!isEditingCritique(critique.id)"> </div> </div> </div> </div> </div> ')
    }])
}(),
function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("common/directives/single-line-collapse.tmpl.html", '<div ng-if="singleLineCollapse" class="one-line-collapse"> <div uib-collapse="collapse" class="collapse"> <div marked="text"></div> </div> <a ng-if="isToggleShown && collapsed" class="toggle" href="" ng-click="toggleCollapse()">{{ \'show\' | translate }}</a><p></p> <a ng-if="isToggleShown && !collapsed" class="toggle" href="" ng-click="toggleCollapse()">{{ \'hide\' | translate }}</a><p></p> </div> ')
    }])
}(),
function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("common/templates/404.tmpl.html", '<div class="row row-gap-huge"> <div class="col-sm-6 col-sm-offset-3 text-center"> <div class="info-pic"><img src="/assets/images/404.png" alt="What are you doing here, Doctor?" title="What are you doing here, Doctor?"></div> <h1 translate="">We\'re very sorry...</h1> <p translate="">The page you were looking for slipped through a crack and can\'t be found!</p> </div> </div> <div class="row row-gap-huge"></div>')
    }])
}(),
function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("common/templates/api-token-modal.tmpl.html", '<div> <button type="button" class="close hanging-close" aria-label="close" ng-click="$dismiss()"> </button> <div class="modal-header text-center"> <p translate="">API Access</p> </div> <div ng-if="!ctrl.isEditing()"> <div class="modal-body"> <div class="row"> <div class="col-xs-10 col-xs-offset-1"> <h3 translate="">Your Token</h3> <textarea readonly="true" wrap="soft" class="form-control" rows="3">{{apiToken}}</textarea> </div> </div> </div> <div class="modal-footer"> <button class="btn btn-primary" ng-disabled="$invalid" type="submit" ng-click="$dismiss()">{{ \'Close\' | translate }}</button> </div> </div> </div>')
    }])
}(),
function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("common/templates/error.tmpl.html", '<div class="row row-gap-huge"> <div class="col-sm-6 col-sm-offset-3 text-center"> <div class="info-pic"> <img src="/assets/images/oops.png" alt="<vadervoice>NOOOOOOOOOoooooooo!</vadervoice>" title="<vadervoice>NOOOOOOOOOoooooooo!</vadervoice>"> </div> <h1 translate="">Oops, something went wrong...</h1> <p translate="">An error occurred while processing your last request.</p> <p> {{ \'Return to\' | translate }} <a href="http://udacity.com/" translate="">Udacity homepage</a>.</p> </div> </div> <div class="row row-gap-huge"> </div>')
    }])
}(),
function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("common/templates/footer.tmpl.html", '<footer id="footer" ng-controller="FooterCtrl as ctrl" aria-label="Reviewer links"> <div class="container"> <ul class="nav nav-pills"> <li ng-if="currentUser && currentUser.role !== \'student\'"><a href="{{handbookUrl}}" translate="">Reviewer FAQ</a></li> <li ng-if="currentUser && currentUser.role !== \'student\'"><a href="{{agreementUrl}}" target="blank" translate="">Reviewer Agreement</a></li> </ul> </div> </footer> ')
    }])
}(),
function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("common/templates/forbidden.tmpl.html", '<div class="row row-gap-huge"> <div class="col-sm-6 col-sm-offset-3 text-center"> <div class="info-pic"> <img src="/assets/images/oops.png" alt="<vadervoice>NOOOOOOOOOoooooooo!</vadervoice>" title="<vadervoice>NOOOOOOOOOoooooooo!</vadervoice>"> </div> <h1 translate="">Unauthorized</h1> <p translate="">You don\'t have permission to perform your last request.</p> </div> </div> <div class="row row-gap-huge"></div>')
    }])
}(),
function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("common/templates/header.tmpl.html", '<header class="navbar site-nav navbar-inverse navbar-static-top"> <div class="container"> <div class="navbar-header"> <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse"> <span class="sr-only" translate="">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> <a class="logo navbar-brand" href="https://udacity.com" id="header-logo"> <img alt="Udacity Logo" src="//s3-us-west-1.amazonaws.com/udacity-content/rebrand/svg/logo.min.svg"> </a> </div> <nav class="navbar-collapse collapse text-center-xs" id="navbar-collapse" role="navigation"> <ul class="nav navbar-nav navbar-right"> <li ng-if="isStaff" ng-controller="ApiTokenCtrl as ctrl"> <a href="" busy-click="ctrl.showApiTokenModal()">{{ \'API Access\' | translate }}</a> </li> <li ng-if="isGrader"> <a ui-sref="submissions.dashboard" href="" translate="">Dashboard</a> </li> <li> <a data-ng-click="main.logout()" href="" translate="">Logout</a> </li> </ul> <ul class="nav navbar-nav navbar-right ng-cloak"> <li class="dropdown"> <ul class="dropdown-menu"> <a data-ng-click="main.logout()" href="" translate="">Logout</a> </ul> </li> </ul> </nav> </div> </header> ')
    }])
}(),
function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("common/templates/loading.tmpl.html", '<div class="row row-gap-huge"> <div class="text-center"> <div class="loading"></div> </div> </div> <div class="row row-gap-huge"> </div>')
    }])
}(),
function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("projects/components/comment-box.tmpl.html", '<div class="col-xs-12 col-sm-10 col-sm-offset-1"> <textarea class="form-control rating-textarea" ng-attr-placeholder="{{ \'(Optional) Suggest improvements...\' | translate }}" aria-label="{{ \'(Optional) Suggest improvements...\' | translate }}" ng-model="$ctrl.comment" id="comments" rows="3" ng-required="$ctrl.rating !== null && $ctrl.rating < 3">\n  </textarea> </div> ')
    }])
}(),
function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("projects/components/reaction-feedback.tmpl.html", '<section> <div class="reaction-rating text-center"> <label> <input type="radio" name="frown-rating" value="1" ng-model="$ctrl.rating"> <div class="frown-rating" ng-class="{ \'inactive\': $ctrl.rating !== null && $ctrl.rating !== \'1\'}" ng-mouseover="$ctrl.hoverValue = \'1\'" ng-mouseleave="$ctrl.hoverValue = null"></div> </label> <label> <input type="radio" name="neutral-rating" value="3" ng-model="$ctrl.rating"> <div class="neutral-rating" ng-class="{ \'inactive\': $ctrl.rating !== null && $ctrl.rating !== \'3\' }" ng-mouseover="$ctrl.hoverValue = \'3\'" ng-mouseleave="$ctrl.hoverValue = null"></div> </label> <label> <input type="radio" name="happy-rating" value="5" ng-model="$ctrl.rating"> <div class="happy-rating" ng-class="{ \'inactive\': $ctrl.rating !== null && $ctrl.rating !== \'5\'}" ng-mouseover="$ctrl.hoverValue = \'5\'" ng-mouseleave="$ctrl.hoverValue = null"></div> </label> </div> </section> ')
    }])
}(),
function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("projects/components/start-feedback-button.tmpl.html", '<div> <label ng-transclude=""></label> <button type="button" class="btn btn-primary" ng-click="$ctrl.rate()"> {{ \'Start\' | translate }} </button> </div> ')
    }])
}(),
function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("projects/directives/audit-tab.tmpl.html", '<div class="clearfix" ng-if="auditCritiquesAccessor"> <div class="pull-right" ng-if="submissionAudits.length > 1 && selectedAuditContainer.audit"> <label for="audit-select" translate="">Show audit:</label> <select id="audit-select" name="audit-select" ng-model="selectedAuditContainer.audit" ng-change="onAuditSelectChange()" ng-options="option.id for option in submissionAudits track by option.id"> </select> </div> <div ng-if="audit.result"> <h2 class="h-slim-top {{audit.result}}" ng-class="{\'result-label\': isOnboardingAudit}"> {{ audit.result | resultLabel:{pluralize: true} | translate }} </h2> <div ng-if="audit.result === \'failed\'"> <p ng-if="isOnboardingAudit"> {{ \'Your review does not meet all of our quality specifications. Read through the Coach’s comments and then continue to the\' | translate }} <a ui-sref="submissions.dashboard({tab: \'onboarding\'})" href="">{{ \'dashboard\' | translate }}</a> {{ \'for your next instructions. We may limit the number of attempts you have to successfully complete this review.\' | translate }} </p> <p ng-if="!isOnboardingAudit"> {{ \'Your review does not meet all of our quality specifications. The only action required is to apply the auditor’s feedback to future reviews. Reminder: You may not be compensated for this review.\' | translate }} </p> </div> <div ng-if="audit.result === \'passed\'"> <p ng-if="isOnboardingAudit"> {{ \'Great work! Your review meets all of our quality specifications. You may read through this audit and then continue to the\' | translate }} <a ui-sref="submissions.dashboard({tab: \'onboarding\'})" href="">{{ \'dashboard\' | translate }}</a> {{ \'for your next instructions.\' | translate }} </p> <p ng-if="!isOnboardingAudit"> {{ \'Your review meets all of our quality specifications. Keep up the good work!\' | translate }} </p> </div> </div> <div class="pull-right" ng-if="auditEditable"> <button busy-click="unassignAudit()" class="btn btn-default">{{ \'Unassign audit\' | translate }}</button> </div> <div critiques-editor="" critiques-accessor="auditCritiquesAccessor" editable="auditEditable" failed-required-placeholder="\'Explain why the reviewer did not meet the specification and, if applicable, provide guidance for next review.\'" passed-required-placeholder="\'Explain what the reviewer needs to do to exceed the specification.\'" optional-placeholder="\'Give the reviewer some positive feedback.\'" commenter-label="\'Auditor\'" state="auditCritiquesState"> </div> <div class="pull-right" ng-if="auditEditable"> <button busy-click="reviseReview()" class="btn btn-default">{{ \'Create revised review\' | translate }}</button> <button busy-click="confirmSubmitAudit()" ng-disabled="!isComplete()" class="submit-audit btn btn-primary"> <i class="glyphicon glyphicon-check"></i> {{ \'Submit Audit\' | translate }} </button> <div class="row row-gap-medium"></div> </div> <div ng-if="!isAuditor"> <div class="row"></div> <hr class="slim"> <div class="row row-gap-medium"></div> <p class="slim"> <img src="/assets/images/support-icon.svg" class="img-initial icon" alt="Reviews support"> {{ \'Have a question about your audit? Email us at\' | translate }} <a href="mailto:review-support@udacity.com">review-support@udacity.com</a>. </p> <div class="row row-gap-medium"></div> </div> </div> ')
    }])
}(),
function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("projects/directives/create-submission-form.tmpl.html", '<div ng-if="ctrl.isLoading" class="text-center"> <div class="loading"></div> </div> <div ng-if="!ctrl.isLoading"> <div ng-if="ctrl.githubRequired && !ctrl.hasValidGithubToken"> <div github-auth="" redirect-path="#!{{ ctrl.githubAuthRedirectPath }}"> </div> </div> <div ng-if="!ctrl.githubRequired || ctrl.hasValidGithubToken"> <form> <div ng-transclude=""></div> <div ng-if="ctrl.optionalRubricItems && ctrl.optionalRubricItems.length > 0" id="optional-rubric-items"> <div class="form-group text-left"> <h2 translate="">Did you attempt any of the optional features?</h2> <div class="radio"> <label> <input type="radio" ng-model="ctrl.optionalRubricItemsAttempted" value="yes"> {{ \'Yes\' | translate }} </label> </div> <div class="radio"> <label> <input type="radio" ng-model="ctrl.optionalRubricItemsAttempted" value="no"> {{ \'No\' | translate }} </label> </div> </div> <div class="form-group text-left" ng-show="ctrl.optionalRubricItemsAttempted === \'yes\'"> <div class="row row-gap-small"></div> <h2 translate="">Select any of the optional features that you attempted</h2> <div rubric-items-selector="" rubric-items="ctrl.optionalRubricItems"> </div> </div> </div> <div class="form-group"> <div ng-if="isCareer" class="text-left"> <h2 translate=""> Desired Role and Industry (Required) </h2> <p class="text-left" translate="DESIRED_ROLE_TEXT"></p> <textarea class="form-control" ng-model="ctrl.intendedCareer" rows="2"></textarea> </div> <div class="notes-to-reviewer"> <h2 ng-show="!isCareer" translate="">Submission Details</h2> <label ng-show="!isCareer" for="more-info" class="text-left" translate=""> Are there any areas you would like your reviewer to pay particular attention to? </label> <h2 ng-show="isCareer" translate="">Additional Details (Required)</h2> <label ng-show="isCareer" for="more-info" class="text-left" translate="ADDITIONAL_DETAILS_TEXT"></label> <textarea id="more-info" class="form-control" ng-model="ctrl.studentNotes" rows="4"></textarea> </div> <div ng-if="canaryEnabled" class="unit-test-confirmation"> <h2 translate="">Did you run unit tests on your project?</h2> <ul class="radio text-left"> <li class="radio-list"> <input name="tests" id="unit-tests-yes" ng-change="ctrl.transitionTestWarning(\'complete\')" ng-model="ctrl.unitTestAnswer" ng-value="\'yes\'" class="pull-left" type="radio"> <label for="unit-tests-yes">{{ \'Yes, successfully\' | translate }}</label> </li> <li class="radio-list"> <input name="tests" id="unit-tests-yes-but" ng-change="ctrl.transitionTestWarning(\'warning\')" ng-model="ctrl.unitTestAnswer" ng-value="\'yesBut\'" class="pull-left" type="radio"> <label for="unit-tests-yes-but">{{ \'Yes, but they did not pass\' | translate }}</label> </li> <li class="radio-list"> <input name="tests" id="unit-tests-no" ng-change="ctrl.transitionTestWarning(\'error\')" ng-model="ctrl.unitTestAnswer" ng-value="\'no\'" class="pull-left" type="radio"> <label for="unit-tests-no">{{ \'No\' | translate }}</label> </li> </ul> <div ng-show="ctrl.unitTestAnswer === \'yesBut\'" ng-class="ctrl.warningClass"> <span translate="">You’re almost there! You are required to pass unit tests before submitting your project. Need help?</span> <span translate="">Try on</span> <a ng-href="{{canaryMetadata.canary_slack_url}}" target="_blank">{{ \'Slack\' | translate }}</a> <span translate="">or ask in the</span> <a ng-href="{{canaryMetadata.canary_forums_url}}" target="_blank">{{ \'Forums\' | translate }}</a>. </div> <div ng-show="ctrl.unitTestAnswer === \'no\'" ng-class="ctrl.errorClass"> <span translate="">You are required to pass unit tests before submitting your project. Need help?</span> <span translate="">Reach out on</span> <a ng-href="{{canaryMetadata.canary_slack_url}}" target="_blank">{{ \'Slack\' | translate }}</a> <span translate="">or ask in the</span> <a ng-href="{{canaryMetadata.canary_forums_url}}" target="_blank">{{ \'Forums\' | translate }}</a>. </div> </div> <div class="row row-gap-small"></div> <div ng-if="!isCareer" class="text-left"> <h2 translate="">Udacity Honor Code</h2> <p> <input type="checkbox" id="my-work" ng-model="ctrl.myWorkTermsAccepted"> <label for="my-work" class="checkbox-description"> <span translate="HONOR_CODE_MY_WORK"></span> </label> </p> <p> <input type="checkbox" id="attribution" ng-model="ctrl.attributionTermsAccepted"> <label for="attribution" class="checkbox-description"> <span translate="HONOR_CODE_ATTRIBUTION"></span> </label> </p> <p> <input type="checkbox" id="plagiarism" ng-model="ctrl.plagiarismTermsAccepted"> <label for="plagiarism" class="checkbox-description"> <span translate="HONOR_CODE_PLAGIARISM"></span> </label> </p> </div> </div> <div ng-if="isCareer" class="text-left"> <h2 translate="">Udacity Honor Code</h2> <p> <input type="checkbox" id="my-info" ng-model="ctrl.visibilityTermsAccepted"> <label for="my-info" class="checkbox-description"> <span translate="">I understand that my submitted materials will be visible to the reviewer, including any personal information I choose to include.</span> </label> </p> <p> <input type="checkbox" id="plagiarism" ng-model="ctrl.plagiarismTermsAccepted"> <label for="plagiarism" class="checkbox-description"> <span translate="HONOR_CODE_PLAGIARISM"></span> </label> </p> </div> </form></div> <div class="row row-gap-medium"> <div class="col-xs-12"> <div class="submission-error-container"> <p ng-repeat="error in ctrl.formErrors track by $index"> {{ error }} </p> </div> </div> <div class="col-xs-12"> <button type="submit" ng-disabled="!ctrl.isFormComplete(transclusionValid) ? \'disabled\' : null" class="btn btn-primary btn-min-width-sm submit-file" busy-click="ctrl.submit()"> {{ \'Submit\' | translate }} </button>  <div ng-show="ctrl.errorMessage" scroll-if="ctrl.errorMessage" class="row row-gap-medium"> <div class="alert alert-danger" ng-bind-html="ctrl.errorMessage | translate"> </div> </div> </div> </div> <div class="row row-gap-medium"></div> </div> ')
    }])
}(),
function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("projects/directives/github-auth.tmpl.html", '<div class="row text-center"> <p class="text-center" translate=""> Connect your GitHub account to your Udacity account to enable us to access your public repositories. </p> <a href="{{ githubAuthUrl }}" class="btn btn-lg btn-primary"> <i class="glyphicon glyphicon-link"></i> {{ \'Connect with GitHub\' | translate }} </a> </div>')
    }])
}(),
function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("projects/directives/plagiarism-case-tab.tmpl.html", '<div class="clearfix" ng-if="plagiarismCaseCritiquesAccessor"> <div class="pull-right" ng-if="submissionPlagiarismCases.length > 1 && selectedPlagiarismCaseContainer.plagiarismCase"> <label for="plagiarism-case-select">{{ \'Show plagiarism case:\' | translate }}</label> <select id="plagiarism-case-select" name="plagiarism-case-select" ng-model="selectedPlagiarismCaseContainer.plagiarismCase" ng-change="onPlagiarismCaseSelectChange()" ng-options="option.id for option in submissionPlagiarismCases track by option.id"> </select> </div> <div ng-if="plagiarismCase.result"> <div ng-if="plagiarismCase.result === \'failed\'"> <p> {{ \'This submission is confirmed to have been plagiarized.\' | translate }} </p> </div> <div ng-if="plagiarismCase.result === \'passed\'"> <p> {{ \'This submission is not plagiarized and once staff marks the plagiarism case as resolved, it will no longer be flagged as a demerit for the student.\' | translate }} </p> </div> </div> <div class="pull-right" ng-if="plagiarismCaseEditable"> <button busy-click="unassignPlagiarismCase()" class="btn btn-default">{{ \'Unassign plagiarism case\' | translate }}</button> </div> <div critiques-editor="" critiques-accessor="plagiarismCaseCritiquesAccessor" editable="plagiarismCaseEditable" failed-required-placeholder="\'Explain how the student plagiarized their submission.\'" passed-required-placeholder="\'Explain how the student did not plagiarize this submission.\'" optional-placeholder="\'Give additional feedback.\'" commenter-label="\'PlagiarismCaseReviewer\'" state="plagiarismCaseCritiquesState"> </div> <div class="pull-right" ng-if="plagiarismCaseEditable"> <button busy-click="confirmSubmitPlagiarismCase()" ng-disabled="!isComplete()" class="submit-plagiarism-case btn btn-primary"> <i class="glyphicon glyphicon-check"></i> {{ \'Submit Plagiarism Case\' | translate }} </button> <div class="row row-gap-medium"></div> </div> </div> ')
    }])
}(),
function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("projects/directives/rubric-items-selector.tmpl.html", '<div class="text-left rubric-items-selector"> <div ng-repeat="rubricItem in rubricItems"> <label class="full-width"> <input type="checkbox" name="rubricItem" ng-model="rubricItem.isSelected"> <div class="checkbox-description"> <div marked="rubricItem.passed_description"></div> </div> </label> </div> </div> ')
    }])
}(),
function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("projects/directives/rubric-table.tmpl.html", '<div ng-repeat="section in rubric.sections"> <span class="rubric-section" ng-bind-html="localize(section, \'name\', markup=true)"> </span> <table class="table table-bordered section-table"> <thead> <tr> <th class="rubric-category criteria-column col-xs-3" ng-if="!rubric.hide_criteria"> <span translate="">Criteria</span> </th> <th class="rubric-category meets-specs-column" ng-class="settings.showReviewerTips ? col-xs-4 : (settings.showCompletedChecklist ? col-xs-6 : col-xs-7)"> <span translate="">Meets Specifications</span> </th> <th class="rubric-category reviewer-tips-column col-xs-3" ng-if="settings.showReviewerTips"> <span translate="">Reviewer Tips</span> </th> <th class="rubric-category completed-checklist-column col-xs-1" ng-if="settings.showCompletedChecklist"> <span translate="">Completed?</span> </th> </tr> </thead> <tbody>  <tr ng-repeat="rubricItem in section.rubric_items"> <td class="rubric-item criteria col-xs-3" ng-if="!rubric.hide_criteria" ng-bind-html="localize(rubricItem, \'criteria\', markup=true)"> </td> <td class="rubric-item meets-spec" ng-class="settings.showReviewerTips ? col-xs-4 : (settings.showCompletedChecklist ? col-xs-6 : col-xs-7)" ng-bind-html="localize(rubricItem, \'passed_description\', markup=true)"> </td> <td class="rubric-item reviewer-tip col-xs-3" ng-if="settings.showReviewerTips" ng-bind-html="localize(rubricItem, \'reviewer_tips\', markup=true)"> </td> <td class="rubric-item completed-checkbox col-xs-1" ng-if="settings.showCompletedChecklist" ng-click="onCheckboxParentClick($event, rubricItem)"> <input type="checkbox" name="{{rubricItem.criteria}}" ng-model="criteriaCompleted[rubricItem.criteria]" ng-change="updateCompleted(rubricItem)"> </td> </tr> </tbody> </table> </div> ')
    }])
}(),
function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("projects/directives/social-share.tmpl.html", '<div class="share-table hidden-xs"> <div class="share-prompt"> {{prompt}} </div> <div class="pull-right"> <a ng-click="showTwitterPopup()" class="btn btn-xs"> <img src="/assets/images/twitter.svg"> </a> <a ng-click="showFacebookPopup()" class="btn btn-xs"> <img src="/assets/images/facebook.svg"> </a> </div> </div> <div class="btn-block share-table visible-xs"> {{ \'Share your accomplishment!\' | translate }}&nbsp;<a href="" ng-click="showTwitterPopup()"><img src="/assets/images/twitter.svg"></a>&nbsp;<a href="" ng-click="showFacebookPopup()"><img src="/assets/images/facebook.svg"></a> </div> ')
    }])
}(),
function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("projects/templates/confirm-audit-modal.tmpl.html", '<div> <button type="button" class="close hanging-close" aria-label="close" ng-click="$dismiss()"> </button> <div class="modal-header"> <h2 class="h-slim text-center">Confirm Audit Submission</h2> </div> <div class="modal-body">   <p class="text-center"> Are you sure you\'d like to submit this audit? </p> </div> <div class="modal-footer"> <div class="text-center full-width"> <button class="btn btn-danger" type="submit" ng-click="$close()"> Confirm Audit </button> </div> </div> </div> ')
    }])
}(),
function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("projects/templates/confirm-plagiarism-case-modal.tmpl.html", '<div> <button type="button" class="close hanging-close" aria-label="close" ng-click="$dismiss()"> </button> <div class="modal-header"> <h2 class="h-slim text-center">Confirm Plagiarism Case Submission</h2> </div> <div class="modal-body"> <p class="text-center"> Are you sure you\'d like to submit this plagiarism case? </p> </div> <div class="modal-footer"> <div class="text-center full-width"> <button class="btn btn-danger" type="submit" ng-click="$close()"> Confirm Plagiarism Case </button> </div> </div> </div> ')
    }])
}(),
function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("projects/templates/in-review.tmpl.html", '<div class="row row-gap-huge" ng-controller="InReviewCtrl as ctrl"> <div class="text-center col-sm-6 col-sm-offset-3"> <img class="page-icon-lg" ng-src="/assets/images/student-processing.svg" alt="yellow checkmark icon"> <div> <h1 translate="">We\'re processing your submission</h1> <p> {{ \'You can expect to receive your project feedback from a Udacity Reviewer soon.\' | translate }}. </p> <p> {{ \'Forgot a file or uploaded the wrong zip? There\\\'s still time to cancel your submission!\' | translate }} <a href="https://udacity.zendesk.com/hc/en-us/articles/210743526-How-do-I-cancel-a-project-submission-">{{ \'Learn more\' | translate }}</a>. </p> </div> </div> </div> ')
    }])
}(),
function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("projects/templates/instructions.tmpl.html", '<div ng-controller="InstructionsCtrl as ctrl" class="row row-gap-large"> <div class="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2"> <h1 id="project-name" class="text-center"> {{rubric.project.name}} <h2 id="project-instructions-headline" translate=""> Instructions </h2> <div class="row"> <div marked="rubric.description" opts="{sanitize: false}" class="col-xs-12"></div> </div> <div class="row row-gap-large"></div> </h1></div> </div> ')
    }])
}(),
function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("projects/templates/project-details-modal.tmpl.html", '<div> <button type="button" class="close hanging-close" aria-label="close" ng-click="$dismiss()"> </button> <div class="modal-header"> <h4>{{project.nanodegree_title}}</h4> </div> <div class="modal-body"> <h3 class="h-slim">{{ project.name }}</h3> <div class="row row-gap-small"></div> <span marked="project.required_skills || \'_No Requirements_\'"></span> <div class="row row-gap-small"></div> <span class="caption"><small>{{ project.price | currency : \'$\' : 2 }}</small></span> </div> <div class="modal-footer"> <div class="pull-right"> <button class="btn btn-primary" ng-click="$dismiss()"> {{ \'Close\' | translate }} </button> </div> </div> </div> ')
    }])
}(),
function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("projects/templates/project-rating-reaction-modal.tmpl.html", '<div class="projects_project-rating-modal"> <ng-form class="form-horizontal" name="form"> <div class="modal-body"> <h1 class="rating-heading">{{ \'Rate project\' | translate }}</h1> <div class="feedback-content"> <div class="rating-description text-center" ng-switch="ctrl.hoverValue || ctrl.rating"> <span ng-switch-when="1">{{ ctrl.getAnswerText("frown") | translate }}</span> <span ng-switch-when="3">{{ ctrl.getAnswerText("neutral") | translate }}</span> <span ng-switch-when="5">{{ ctrl.getAnswerText("happy") | translate }}</span> <span ng-switch-default="">{{ ctrl.getCurrentQuestion() | translate }}</span> </div> <div ng-switch="ctrl.getCurrentStep().key"> <reaction-feedback ng-switch-when="project_overall" rating="ctrl.rating" hover-value="ctrl.hoverValue"></reaction-feedback> </div> <div ng-if="ctrl.rating !== null" class="form-group row row-gap-medium"> <comment-box rating="ctrl.rating" comment="ctrl.comment"></comment-box> </div> </div> <div class="row row-gap-medium modal-footer"> <div ng-if="ctrl.getAllSteps().length > 1" class="bubble-path"> <span ng-repeat="step in ctrl.getAllSteps() track by $index" class="bubble-step" ng-class="{\'active\': ctrl.isActiveStep($index), \'visited\': ctrl.isVisitedStep($index)}"></span> </div> <div ng-if="ctrl.getAllSteps().length <= 1"></div> <button ng-if="!ctrl.isLastStep()" class="btn btn-sm btn-primary" ng-disabled="ctrl.isUnrated() || form.$invalid" ng-click="ctrl.getNextStep()">{{ \'next\' | translate }}</button> <button ng-if="ctrl.isLastStep()" type="submit" class="btn btn-sm btn-primary" ng-disabled="ctrl.isUnrated() || form.$invalid" busy-click="ctrl.submitFeedback()">{{ \'submit\' | translate }}</button> </div> </div> </ng-form> </div> ')
    }])
}(),
function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("projects/templates/resubmission-video-modal.tmpl.html", '<div class="modal-body"> <div class="row"> <div class="col-xs-12"> <iframe width="640" height="360" src="https://video.udacity-data.com/topher/2016/September/57e4483c_resubmission-video-v2/resubmission-video-v2.mp4" frameborder="0" allowfullscreen=""></iframe> </div> </div> </div> ')
    }])
}(),
function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("projects/templates/reviewer-bio-modal.tmpl.html", '<div> <button type="button" class="close hanging-close" aria-label="close" ng-click="$dismiss()"> </button> <div class="modal-header"> <div class="reviewer-bio vertical"> <p class="pink">Reviewer profile</p> <div> <img class="reviewer-bio-pic" ng-src="{{ mentor.avatar_url}}"> <p class="reviewer-name">{{ mentor.name }}</p> </div> </div> </div> </div> <hr class="break"> <div class="modal-body"> <p class="about-me"> About Me </p> <p class="bio-text"> {{ mentor.bio }} </p> </div> <div class="modal-footer"> <div class="text-center full-width"> <button class="btn btn-primary" ng-click="$close()"> Close </button> </div> </div> ')
    }])
}(),
function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("projects/templates/rubric.tmpl.html", '<div ng-controller="RubricCtrl as ctrl" class="row"> <div id="proj-spec-div" class="col-xs-offset-1 col-xs-10"> <h2 id="project-spec-headline" translate=""> Project Specification </h2> <h1 id="project-name" ng-bind-html="localize(ctrl.rubric.project, \'name\', markup=true)"> </h1> <div rubric-table="" rubric="ctrl.rubric" settings="ctrl.tableSettings"> </div> <div id="stand-out" ng-if="ctrl.rubric.stand_out" class="col-xs-offset-1 col-xs-10"> <h2 id="stand-out-headline" class="text-center" translate="">Suggestions to Make Your Project Stand Out!</h2> <div id="stand-out-text" ng-bind-html="localize(ctrl.rubric, \'stand_out\', markup=true)"> </div> </div> </div> </div> ')
    }])
}(),
function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("projects/templates/share-review-header.tmpl.html", '<link rel="stylesheet" href="https://www.udacity.com/media/css/standalone/udacity/homepage/homepage.min.css?c6e0c1541f8974c9369c70a045d4c9b4" ,="" type="text/css">  <style>\n  h2 { font-size: 22px; }\n</style> <header class="navbar site-nav navbar-inverse navbar-static-top"> <div class="container"> <div class="navbar-header"> <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse"> <span class="sr-only" translate="">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> <a itemprop="brand" itemscope="" itemtype="http://schema.org/Brand" class="logo navbar-brand" href="/me#!/" id="header-logo"> <meta itemprop="logo" content="//s3-us-west-1.amazonaws.com/udacity-content/rebrand/svg/logo.min.svg"> <img alt="Udacity Logo" src="//s3-us-west-1.amazonaws.com/udacity-content/rebrand/svg/logo.min.svg"> </a> </div> <nav class="navbar-collapse collapse text-center-xs" id="navbar-collapse" role="navigation"> <ul class="nav navbar-nav navbar-right"> <li> <a href="" onclick="window.location.href=\'https://www.udacity.com/account/auth#!/signup?next=\'+encodeURIComponent(window.location.href)" translate="">Sign Up</a> </li> </ul> <ul class="nav navbar-nav navbar-right"> <li> <a id="sign-in" href="" onclick="window.location.href=\'https://www.udacity.com/account/auth#!/signin?next=\'+encodeURIComponent(window.location.href)" translate="">Sign In</a> </li> </ul> <ul class="nav navbar-nav navbar-right"> <li> <a id="catalog" class="dropdown-toggle" href="https://www.udacity.com/courses/all" translate="">Catalog</a> </li> </ul> <ul class="nav navbar-nav navbar-right"> <li> <a href="https://www.udacity.com/nanodegree" translate="">Program</a> </li> </ul> </nav> </div> </header> ')
    }])
}(),
function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("projects/templates/share-review.tmpl.html", '<div class="share-review"> <div class="review-header"> <p class="project-label text-uppercase text-center" translate="">Project</p> <h1 class="project-name text-center">{{project.name}}</h1> <p class="nanodegree-link text-center" ng-if="project.nanodegree_title"> {{ \'A part of the\' | translate }} {{project.nanodegree_title}} {{ \'Program\' | translate }} </p> </div> <div class="row row-gap-medium"></div> <div class="review-container"> <ul class="nav nav-tabs nav-justified"> <li class="active"> <a href="" translate="">Project Review</a> </li> <li> <a href=""> <img src="/assets/images/icon-lock.svg" uib-popover="{{ \'Udacity Code Reviewers review projects line-by-line and provide helpful comments.\' | translate }}" popover-placement="top" popover-class="share-review-locked" popover-trigger="mouseenter" alt="{{ \'Locked section\' | translate }}">&nbsp;{{ \'Code Review\' | translate }}&nbsp;<span ng-if="submission.comment_count" class="badge badge-info text-center">{{submission.comment_count}}</span> </a> </li> <li ng-if="submission.has_annotations"> <a href=""> <img src="/assets/images/icon-lock.svg" uib-popover="{{ \'Udacity Code Reviewers review projects line-by-line and provide helpful comments.\' | translate }}" popover-placement="top" popover-class="share-review-locked" popover-trigger="mouseenter" alt="{{ \'Locked section\' | translate }}">&nbsp;{{ \'Annotations\' | translate }}&nbsp;<span class="badge badge-info text-center">1</span> </a> </li> <li> <a href=""> <img src="/assets/images/icon-lock.svg" uib-popover="{{ \'Udacity Code Reviewers review projects line-by-line and provide helpful comments.\' | translate }}" popover-placement="top" popover-class="share-review-locked" popover-trigger="mouseenter" alt="{{ \'Locked section\' | translate }}">&nbsp;{{ \'Notes\' | translate }}</a> </li> </ul> <div class="row row-gap-large"> <div class="col-xs-10 col-xs-offset-1"> <div ng-if="submission.result"> <h2 class="result-label h-slim-top"> {{ submission.result | resultLabel:{pluralize: true} | translate }} </h2> <div ng-if="doesNotMeetCount > 0"> <h3 class="result-label"><span class="{{submission.result}}"></span>{{ doesNotMeetCount | pluralize: \'specification requires\':\'specifications require\' | translate }} {{ \'revision\' | translate }}</h3> </div> </div> <div ng-if="submission.general_comment" class="additional-reviewer-comment"> <p marked="submission.general_comment"></p> </div> <div ng-if="critiquesAccessor" critiques-editor="" critiques-accessor="critiquesAccessor" editable="false"> </div> </div> <div> </div> </div> </div></div>')
    }])
}(),
function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("projects/templates/show-review.tmpl.html", '<div class="row"> <div class="col-xs-12 col-lg-10 col-lg-offset-1"> <h4 ng-if="submission.previous_submission_id" translate="">REVISED REVIEW</h4> <div class="review-header"> <div class="review-header__links"> <div> <a href="" ng-click="goToClassroomPath()" class="course-link"> <span class="arrow"></span>&nbsp; <span translate=""> Return to Classroom </span> </a> </div> </div> <h1 class="project-name-career-service">{{currentProject.name}}</h1> </div> <div class="row row-gap-medium"></div> <div class="review-container"> <ul class="nav nav-tabs nav-justified" ng-show="isUngradeable()"> <li ng-class="{\'active\': isCurrentTab(\'feedback\')}"> <a href="" ng-click="showTab(\'feedback\')">{{ \'Review\' | translate }}</a> </li> <li ng-class="{\'active\': isCurrentTab(\'history\')}"> <a href="" ng-click="showTab(\'history\')">{{ \'History\' | translate }}</a> </li> <li ng-if="plagiarismCaseTabState.visible" ng-class="{\'active\': isCurrentTab(\'plagiarismCase\')}"> <a href="" ng-click="showTab(\'plagiarismCase\')">{{ \'Plagiarism\' | translate }}</a> </li> </ul> <ul class="nav nav-tabs nav-justified" ng-hide="isUngradeable()"> <li ng-if="hasFeedback" ng-class="{\'active\': isCurrentTab(\'feedback\')}"> <a href="" ng-click="showTab(\'feedback\')">{{ \'Review\' | translate }}</a> </li> <li ng-if="showCode" ng-class="{\'active\': isCurrentTab(\'code\')}"> <a href="" ng-click="showTab(\'code\')"> {{ \'Code Review\' | translate }}&nbsp; <span ng-if="commentsCount > 0" class="badge badge-info text-center"> {{ commentsCount }} </span> </a> </li> <li ng-if="annotation_link" ng-class="{\'active\': isCurrentTab(\'annotation\')}"> <a href="" ng-click="showTab(\'annotation\')"> {{ \'Annotations\' | translate }}&nbsp; <span class="badge badge-info text-center">1</span> </a> </li> <li ng-class="{\'active\': isCurrentTab(\'history\')}"> <a href="" ng-click="showTab(\'history\')">{{ \'History\' | translate }}</a> </li> <li ng-if="userCanCreateAudits() && !auditTabState.visible"> <a href="" busy-click="assignAudit()">+ {{ \'Audit this Review\' | translate }}</a> </li> <li ng-if="auditTabState.visible" ng-class="{\'active\': isCurrentTab(\'audit\')}"> <a href="" ng-click="showTab(\'audit\')">{{ \'Audit\' | translate }}</a> </li> <li ng-if="plagiarismCaseTabState.visible" ng-class="{\'active\': isCurrentTab(\'plagiarismCase\')}"> <a href="" ng-click="showTab(\'plagiarismCase\')">{{ \'Plagiarism\' | translate }}</a> </li> </ul> <div class="row review-tab-body"> <div class="col-sm-10 col-sm-offset-1"> <div ng-show="isUngradeable()"> <div class="row row-gap-medium"></div> <section ng-show="isCurrentTab(\'feedback\')"> <div class="ungradeable-tab"> <h2 class="result-label" translate="">Unable to review</h2> <div ng-hide="submission.ungradeable_tag === \'plagiarism\'"> <p class="ungradeable-info" translate=""> Your project could not be reviewed. Please resubmit after you address the issue noted below by the reviewer. </p> <p class="result-reason" marked="submission.result_reason"></p> </div> <div ng-show="submission.ungradeable_tag === \'plagiarism\'"> <p class="ungradeable-info"> <span translate="">Key parts of your submission were the same as another student\'s submission or an online source.</span> <span translate="">Please resubmit after you address the issue noted below by the reviewer.</span> </p> <p class="ungradeable-info" ng-show="submission.plagiarism_source_url"> </p><h4 translate="" style="display: inline;">Potential Source URL:</h4> <a href="{{submission.plagiarism_source_url}}">{{ submission.plagiarism_source_url }}</a> <p></p> <p class="result-reason" marked="submission.result_reason"></p> </div> <div class="row row-gap-small"></div> <div ng-if="isResubmittable()" class="row row-gap-small"> <div class="col-xs-12 text-center"> <a ui-sref="rubrics.start({rubricId: currentRubric.id})" class="btn btn-primary visible-xs"> <i class="glyphicon glyphicon-check"></i> {{ \'Resubmit\' | translate }} </a> <button ng-if="isResubmittable()" ui-sref="rubrics.start({rubricId: currentRubric.id})" class="btn btn-primary hidden-xs"> <i class="glyphicon glyphicon-check"></i> {{ \'Resubmit Project\' | translate }} </button> </div> </div> <div ng-if="submission.archive_url" class="row row-gap-small"> <div class="col-xs-12 text-center wide-and-bold"> <a href="{{ submission.archive_url }}" download=""><img src="/assets/images/download-icon.svg" class="img-initial icon-medium">{{ \'Download project files\' | translate }}</a> </div> </div> <div ng-if="submission.url" class="row row-gap-small"> <div class="col-xs-12 text-center"> <a class="wide-and-bold" target="_blank" href="{{ submission.url }}"> <i class="glyphicon glyphicon-new-window"></i>&nbsp; {{ \'Project Link\' | translate }} </a> </div> </div> <div class="row row-gap-small">&nbsp;</div> </div> </section> <section ng-show="isCurrentTab(\'history\')"> <div reviews-list="" ng-if="pastReviews !== undefined" reviews="pastReviews" this-review="submission"></div> </section> </div> <div ng-hide="isUngradeable()"> <div class="row row-gap-medium"></div> <section ng-show="isCurrentTab(\'history\')"> <div reviews-list="" ng-if="pastReviews !== undefined" reviews="pastReviews" this-review="submission" is-career="currentProject.is_career"></div> </section> <section class="code-section" ng-show="isCurrentTab(\'code\')"> <div code-review="" ng-if="files && currentRubric" files="files" rubric="currentRubric" allow-comments="false"></div> <div class="row row-gap-medium"></div> </section> <section ng-show="isCurrentTab(\'annotation\')"> <div class="row row-gap-large"> <div class="col-xs-12 annotation-text" translate=""> Your reviewer has provided annotations for your project </div> </div> <div class="row row-gap-medium"> <div class="col-xs-12"> <a class="btn btn-primary btn-sm" href="{{annotation_link}}" download="" _target="_blank">{{ \'Download annotations\' | translate }}</a> </div> </div> <div class="row row-gap-huge"></div> </section> <section ng-if="critiquesAccessor" ng-show="isCurrentTab(\'feedback\')"> <div ng-if="hasFeedback && submission.result" class="flex-bio" ng-class="{\'send-right\': currentProject.is_career}"> <h2 ng-show="!currentProject.is_career" class="result-label h-slim-top"> {{ submission.result | resultLabel:{pluralize: true} | translate }} <div ng-if="doesNotMeetCount > 0"> <h3 class="result-label"><span class="{{submission.result}}"></span>{{ doesNotMeetCount | pluralize: \'specification requires\':\'specifications require\' | translate }} {{ \'changes\' | translate }}</h3> </div> </h2> <div ng-if="currentProject.is_career && hasMentor" class="reviewer-bio" ng-click="displayReviewerBioModal()"> <img class="reviewer-bio-pic" ng-src="{{ mentor.avatar_url}}"> <div> <p class="pink">{{ \'Reviewed by\' | translate }}</p> <p>{{ mentor.name }}</p> </div> </div> </div> <div ng-if="submission.general_comment" class="row row-gap-medium"> <div class="col-xs-12" marked="submission.general_comment"></div> </div> <div critiques-editor="" critiques-accessor="critiquesAccessor" editable="false" is-career="currentProject.is_career"> </div> <div class="row row-gap-small"></div> <div ng-if="isResubmittable()" class="row row-gap-small"> <div class="col-xs-12 text-center"> <a ng-if="isResubmittable()" ui-sref="rubrics.start({rubricId: currentRubric.id})" class="btn btn-primary visible-xs"> <i class="glyphicon glyphicon-check"></i> {{ \'Resubmit\' | translate }} </a> <button ng-if="isResubmittable()" ui-sref="rubrics.start({rubricId: currentRubric.id})" class="btn btn-primary hidden-xs"> <i class="glyphicon glyphicon-check"></i> {{ \'Resubmit Project\' | translate }} </button> </div> </div> <div class="row row-gap-small"> <div class="col-xs-12 text-center"> <a class="wide-and-bold" ng-if="submission.archive_url" href="{{ submission.archive_url }}" download=""> <img src="/assets/images/download-icon.svg" class="icon-medium" alt="Download">&nbsp;{{ \'Download Project\' | translate }} </a> <a target="_blank" ng-if="submission.url" href="{{ submission.url }}" class="download btn btn-default"> <i class="glyphicon glyphicon-new-window"></i>&nbsp;{{ \'Project Link\' | translate }} </a> </div> </div> <div ng-if="commentsCount > 0" class="row row-gap-small"> <div class="col-xs-12 text-center"> <a href="" ng-click="showTab(\'code\')" class="cta-large"> <span class="badge badge-info text-center"> {{ commentsCount }} </span> &nbsp;{{ \'Code Review Comments\' | translate }} </a> </div> </div> <div class="row row-gap-medium"></div> </section> <section ng-show="isCurrentTab(\'audit\')"> <div audit-tab="" submission="submission" state="auditTabState"></div> </section> </div>  <div> <div class="row row-gap-medium"></div> <section ng-show="isCurrentTab(\'plagiarismCase\')"> <div plagiarism-case-tab="" submission="submission" state="plagiarismCaseTabState"></div> </section> </div> </div>  </div>  </div>  </div>  </div>  <div ng-show="isCurrentTab(\'feedback\') || isUngradeable()"> <div ng-if="!hasViewedResubmissionVideo() && isResubmittable()" class="row row-gap-small"> <div class="col-md-8 col-md-offset-2"> <div class="row"> <div class="col-md-3"> <div class="thumbnail thumbnail-bordered t-slim"> <img src="/assets/images/resubmission-video.jpg"> </div> </div> <div class="col-md-9"> <h3 translate="">Best practices for your project resubmission</h3> <p translate="">Ben shares 5 helpful tips to get you through revising and resubmitting your project.</p> <p class="caption"> <a href="" ng-click="showResubmissionVideo()"> <i class="glyphicon glyphicon-play-circle"></i>&nbsp;{{ \'Watch Video\' | translate }} </a> (3:01) </p> </div> </div> </div> </div> </div> <div ng-if="hasViewedResubmissionVideo() && isResubmittable() || isSubmissionByCurrentUser()" class="row row-gap-medium"> <div class="col-md-10 col-md-offset-1 text-center"> <div ng-if="hasViewedResubmissionVideo() && isResubmittable()"> <p> {{ \'Learn the\' | translate }} <a href="" ng-click="showResubmissionVideo()">{{ \'best practices for revising and resubmitting your project\' | translate }}</a>. </p> <br> </div> </div> </div> <div class="row row-gap-medium"></div> <div ng-if="!currentProject.entitlement_required && isSubmissionByCurrentUser() && currentProject.nanodegree_key" class="row row-gap-medium"> <div class="col-xs-12 text-center"> <a class="btn btn-primary" ng-click="goToClassroomPath()">{{ \'Return to Path\' | translate }}</a> </div> </div>  <div class="visible-xs row row-gap-medium" ng-if="shouldShowAssessmentFooter()"> <div class="col-xs-12"> <div ng-if="showStudentFeedback" class="locked-feedback-footer"> <div class="rate-me-wrapper"> <start-feedback-button start-feedback="rateReview()"> {{ \'Rate this review\' | translate }} </start-feedback-button> </div> </div>  <div ng-show="!showStudentFeedback && showProjectRating" class="locked-feedback-footer"> <div class="rate-me-wrapper"> <start-feedback-button start-feedback="rateProject()"> {{ \'Rate this project\' | translate }} </start-feedback-button> </div> </div> </div> </div> <footer> <div sticky-footer="" ng-if="shouldShowAssessmentFooter()" class="row hidden-xs" aria-label="Rating footer" role=""> <div ng-if="showStudentFeedback" class="floating-feedback-footer"> <div class="rate-me-wrapper"> <start-feedback-button start-feedback="rateReview()"> {{ \'Rate this review\' | translate }} </start-feedback-button> </div> </div>  <div ng-if="!showStudentFeedback && showProjectRating" class="floating-feedback-footer"> <div class="rate-me-wrapper"> <start-feedback-button start-feedback="rateProject()"> {{ \'Rate this project\' | translate }} </start-feedback-button> </div> </div> </div> </footer> <div class="row row-gap-medium"></div> <div id="comment-wrapper"></div> ')
    }])
}(),
function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("projects/templates/start.tmpl.html", '<div ng-controller="StartCtrl as ctrl" class="row row-gap-huge projects_start"> <div class="col-sm-6 col-sm-offset-3 text-center"> <h1>{{ ctrl.projectName }}</h1> <h2> {{ \'How would you like to submit your project?\' | translate }} </h2> <div class="row row-gap-medium"></div> <div class="buttons"> <div ng-if="ctrl.hasUploadType(\'zip\')" class="thumbnail"> <img ng-click="ctrl.redirectToSubmitMethod(\'zip\')" class="page-icon-md clickable" src="/assets/images/upload-zip.svg" alt="{{" \'upload="" zip="" file\'="" |="" translate="" }}=""> <div class="row row-gap-small"></div> <button ng-click="ctrl.redirectToSubmitMethod(\'zip\')" class="btn btn-default btn-min-width-sm"> {{ \'Upload zip file\' | translate }} </button> </div> <div ng-if="ctrl.hasUploadType(\'repo\')" class="thumbnail"> <img ng-click="ctrl.redirectToSubmitMethod(\'repo\')" class="page-icon-md clickable" src="/assets/images/select-github-repo.svg" alt="{{" \'select="" github="" repo\'="" |="" translate="" }}=""> <div class="row row-gap-small"></div> <button ng-click="ctrl.redirectToSubmitMethod(\'repo\')" class="btn btn-default btn-min-width-sm"> {{ \'Select GitHub repo\' | translate }} </button> <div class="row row-gap-small small"> {{ "If you\'re unfamiliar with" | translate }} <br>{{ \'GitHub, choose "Upload zip file"\' | translate }}. </div> </div> <div ng-if="ctrl.hasUploadType(\'file\')" class="thumbnail text-center"> <img ng-click="ctrl.redirectToSubmitMethod(\'file\')" class="page-icon-md clickable" src="/assets/images/upload-file.svg"> <div class="row row-gap-small"></div> <button ng-click="ctrl.redirectToSubmitMethod(\'file\')" class="btn btn-default btn-min-width-sm"> {{ \'Upload file\' | translate }} </button> <div class="row row-gap-small small"> {{ \'Upload your zip, pdf, html or md file.\' | translate }} </div> </div> <div ng-if="ctrl.hasUploadType(\'link\')" class="thumbnail text-center"> <img ng-click="ctrl.redirectToSubmitMethod(\'link\')" class="page-icon-md clickable" src="/assets/images/submit-link.svg"> <div class="row row-gap-small"></div> <button ng-click="ctrl.redirectToSubmitMethod(\'link\')" class="btn btn-default btn-min-width-sm"> {{ \'Submit link\' | translate }} </button> </div> <div ng-if="ctrl.hasUploadType(\'text\')" class="thumbnail text-center"> <img ng-click="ctrl.redirectToSubmitMethod(\'text\')" class="page-icon-md clickable" src="/assets/images/upload-file.svg"> <div class="row row-gap-small"></div> <button ng-click="ctrl.redirectToSubmitMethod(\'text\')" class="btn btn-default btn-min-width-sm"> {{ \'Write submission\' | translate }} </button> </div> </div> <div class="row row-gap-medium"></div>  </div> </div> <div class="row row-gap-huge"> </div>')
    }])
}(),
function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("projects/templates/student-feedback-reaction-modal.tmpl.html", '<div class="projects_student-feedback-modal"> <ng-form class="form-horizontal" name="form"> <div class="modal-body"> <h1 class="rating-heading">{{ \'Rate review\' | translate }}</h1> <div class="feedback-content"> <div class="rating-description text-center" ng-switch="ctrl.hoverValue || ctrl.rating"> <span ng-switch-when="1">{{ ctrl.getAnswerText("frown") | translate }}</span> <span ng-switch-when="3">{{ ctrl.getAnswerText("neutral") | translate }}</span> <span ng-switch-when="5">{{ ctrl.getAnswerText("happy") | translate }}</span> <span ng-switch-default="">{{ ctrl.getCurrentQuestion() | translate }}</span> </div> <div ng-switch="ctrl.getCurrentStep().key"> <reaction-feedback ng-switch-when="review_use" rating="ctrl.rating" hover-value="ctrl.hoverValue"></reaction-feedback> <reaction-feedback ng-switch-when="review_clarity" rating="ctrl.rating" hover-value="ctrl.hoverValue"></reaction-feedback> <reaction-feedback ng-switch-when="review_detail" rating="ctrl.rating" hover-value="ctrl.hoverValue"></reaction-feedback> <reaction-feedback ng-switch-when="review_personal" rating="ctrl.rating" hover-value="ctrl.hoverValue"></reaction-feedback> <reaction-feedback ng-switch-when="review_unbiased" rating="ctrl.rating" hover-value="ctrl.hoverValue"></reaction-feedback> </div> <div ng-if="ctrl.rating !== null" class="form-group row row-gap-medium"> <comment-box rating="ctrl.rating" comment="ctrl.comment"></comment-box> </div> </div> <div class="row row-gap-medium modal-footer"> <div ng-if="ctrl.getAllSteps().length > 1" class="bubble-path"> <span ng-repeat="step in ctrl.getAllSteps() track by $index" class="bubble-step" ng-class="{\'active\': ctrl.isActiveStep($index), \'visited\': ctrl.isVisitedStep($index)}"></span> </div> <div ng-if="ctrl.getAllSteps().length <= 1"></div> <button ng-if="!ctrl.isLastStep()" class="btn btn-sm btn-primary" ng-disabled="ctrl.isUnrated() || form.$invalid" ng-click="ctrl.getNextStep()">{{ \'next\' | translate }}</button> <button ng-if="ctrl.isLastStep()" type="submit" class="btn btn-sm btn-primary" ng-disabled="ctrl.isUnrated() || form.$invalid" busy-click="ctrl.submitFeedback()">{{ \'submit\' | translate }}</button> </div> </div> </ng-form> </div> ')
    }])
}(),
function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("projects/templates/submit-link.tmpl.html", '<div ng-controller="SubmitLinkCtrl as ctrl" class="row row-gap-huge projects_submit-repo"> <div class="col-xs-12 col-sm-10 col-sm-offset-1"> <div class="text-center"> <img class="page-icon" src="/assets/images/submit-link.svg" alt="Link submission"> <h1 translate="">Submit Link</h1> </div> <div class="row row-gap-large"></div> <div create-submission-form="" rubric-id="ctrl.rubricId" submission="ctrl.submission" transclusion-valid="ctrl.isValid" github-required="false" submit="ctrl.createSubmission()" is-career="ctrl.isCareer"> <h2 translate="">Project link</h2> <p class="text-left text-muted" translate=""> Check that your link is publicly accessible </p> <input type="text" required="" class="form-control" ng-model="ctrl.submission.url" aria-label="{{ \'Project link\' | translate }}"> </div> </div> </div> <div class="row row-gap-huge"></div> ')
    }])
}(),
function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("projects/templates/submit-repo.tmpl.html", '<div ng-controller="SubmitRepoCtrl as ctrl" class="row row-gap-huge projects_submit-repo"> <div class="col-xs-12 col-sm-10 col-sm-offset-1"> <div class="text-center"> <img class="page-icon" alt="Github Repository" src="/assets/images/select-github-repo.svg"> <h1 translate="">Select your repository</h1> </div> <div class="row row-gap-large"></div> <div create-submission-form="" rubric-id="ctrl.rubricId" submission="ctrl.submission" transclusion-valid="ctrl.isValid" github-required="true" canary-enabled="ctrl.canaryEnabled" canary-metadata="ctrl.canaryMetadata" submit="ctrl.createSubmission()" is-career="ctrl.isCareer"> <div class="repo-list"> <div class="alert alert-danger" ng-if="!ctrl.hasRepos()" translate="NO_PUBLIC_REPOS"></div> <div ng-if="ctrl.hasRepos()"> <p translate="">Please ensure that your project is on the default branch</p> <div class="radio text-left" ng-repeat="repo in ctrl.repos"> <label> <input name="repo" ng-model="ctrl.selectedRepoFullName" ng-value="repo.full_name" class="pull-left" type="radio"> <div> <strong>{{repo.name}}</strong> <p class="caption"><small>{{repo.description}}</small></p> </div> </label> <div ng-if="!$last" class="row row-gap-small"></div> </div> </div> </div> </div> </div> </div> <div class="row row-gap-huge"> </div>')
    }])
}(),
function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("projects/templates/submit-text.tmpl.html", '<div ng-controller="SubmitTextCtrl as ctrl" class="row row-gap-large projects_submit-zip"> <div class="col-xs-12 col-sm-10 col-sm-offset-1"> <h1 class="text-center" translate="">Write your submission</h1> <div class="row row-gap-medium"></div> <div create-submission-form="" rubric-id="ctrl.rubricId" submission="ctrl.submission" github-required="false" transclusion-valid="ctrl.isValid()" submit="ctrl.createSubmission()"> <div ng-class="{\'has-error\': ctrl.fileErrorMessage}" class="form-group text-left" scroll-if="ctrl.fileErrorMessage"> <div class="row"> <div class="col-xs-12"> <h2 translate="">Name your file</h2> </div> </div> <div class="row"> <div class="col-xs-8"> <input type="text" ng-model="ctrl.filename" class="form-control" aria-label="File name"> </div> <div class="col-xs-4 form-error" ng-bind-html="ctrl.fileErrorMessage | translate"></div> </div> <div class="row row-gap-medium"> <div class="col-xs-6"> <h2 class="h-slim" translate="">Compose your submission</h2> </div> </div> <div class="row"> <uib-tabset class="col-xs-12 container" justified="true"> <uib-tab heading="{{ \'Compose\' | translate }}"> <div class="compose-content"> <div class="btn-group" uib-dropdown=""> <button id="split-button" type="button" class="btn btn-default btn-xs">{{ctrl.syntax === \'html\' ? \'HTML\' : \'Markdown\'}}</button> <button type="button" class="btn btn-default btn-xs" uib-dropdown-toggle=""> <span class="caret"></span> <span class="sr-only" translate="">Split button!</span> </button> <ul class="dropdown-menu" role="menu"> <li role="menuitem"><a href="" ng-click="ctrl.syntax = \'html\'">{{ \'HTML\' | translate }}</a></li> <li role="menuitem"><a href="" ng-click="ctrl.syntax = \'markdown\'">{{ \'Markdown\' | translate }}</a></li> </ul> </div> <div class="row row-gap-small"></div> <textarea rows="20" ng-model="ctrl.text" class="form-control" aria-label="{{ \'Submission text\' | translate }}">\n                </textarea> </div> </uib-tab> <uib-tab heading="{{ \'Preview\' | translate }}"> <div class="preview-content"> <div ng-if="ctrl.syntax === \'html\'" class="submit-text-size submit-text-preview" ng-bind-html="ctrl.text"></div> <div ng-if="ctrl.syntax === \'markdown\'" marked="ctrl.text" class="submit-text-size submit-text-preview"></div> </div> </uib-tab> </uib-tabset> </div> </div> </div> </div> </div> <div class="row row-gap-small"></div> ')
    }])
}(),
function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("projects/templates/submit-zip.tmpl.html", '<div ng-controller="SubmitZipCtrl as ctrl" class="row row-gap-huge"> <div class="col-xs-12 col-sm-10 col-sm-offset-1"> <div class="text-center"> <img ng-if="fileType === \'archive\'" class="page-icon" ng-src="{{zipImgSource}}" alt="zip folder icon"> <img ng-if="fileType === \'pdf\'" class="page-icon" ng-src="{{pdfImgSource}}" alt="pdf icon"> <h1 ng-if="fileType === \'archive\'">{{archiveHeader | translate}}</h1> <h1 ng-if="fileType === \'pdf\'">{{ \'Upload your file\' | translate }}</h1> </div> <div class="row row-gap-small"></div> <div create-submission-form="" rubric-id="ctrl.rubricId" submission="ctrl.submission" github-required="false" transclusion-valid="ctrl.isValid" submit="ctrl.createSubmission()" submit-btn-text="ctrl.submitBtnText" canary-enabled="ctrl.canaryEnabled" canary-metadata="ctrl.canaryMetadata" is-career="ctrl.isCareer"> <div class="row row-gap-small"></div> <p ng-if="fileType === \'archive\'">{{ \'Compress your project file(s) into a single zip file on your computer.\' | translate }}</p> <p ng-if="fileType === \'pdf\'">{{ \'Upload your zip, pdf, html or md file.\' | translate }}</p> <div ng-class="{\'has-error\': ctrl.fileErrorMessage}" class="form-group text-left" scroll-if="ctrl.fileErrorMessage"> <div class="row"> <div class="col-xs-8 col-md-7"> <button ngf-select="" ng-model="ctrl.genericFiles" type="button" class="btn btn-default blue-grey lighten-4" accept="{{acceptHeader}}"> {{ \'Choose file\' | translate }} </button> &nbsp;{{ ctrl.isValid ? ctrl.getSelectedFile().name : \'no file chosen\' | translate }} <p class="caption p-slim"><small>{{ctrl.rubric.max_upload_size_mb}} {{\'MB limit (uncompressed)\' | translate }}</small></p> </div> <div class="col-xs-4 form-error" ng-bind-html="ctrl.fileErrorMessage | translate"> </div> </div> </div> </div> </div> </div> ')
    }])
}(),
function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("submissions/directives/audits-list.tmpl.html", '<table class="table borderless"> <thead> <th translate="">Date of Audit</th> <th translate="">Audit</th> </thead> <tr ng-repeat="audit in audits"> <td class="col-md-3 col-xs-4"> {{ audit.completed_at | amDateFormat:\'LL\' }} </td> <td class="col-md-9 col-xs-8"> <div ng-if="!audit.read_at" class="pill pill-new pull-right">{{ \'New Audit\' | translate }}</div> <a ui-sref="reviews-show({submissionId: audit.submission_id, audit: 1})"> {{ audit.submission_project.name }} </a> <p class="caption caption-small p-slim">{{ audit.result | resultLabel:{pluralize: true} | translate }}</p> </td> </tr> </table>')
    }])
}(),
function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("submissions/directives/certification-status.tmpl.html", '<div class="vertical-subway vertical-subway-small"> <div class="row"> <div class="col-xs-12"> <div class="subway-sign"> <span class="glyphicon" ng-class="{\'glyphicon-ok\': certification.training.status === \'passed\', \'glyphicon-lock\': certification.training.status === \'locked\', \'filled-circle\': [\'passed\', \'locked\'].indexOf(certification.training.status) === -1}"> </span> </div> <div class="subway-content"> <span ng-if="certification.status === \'applied\' && !submissionPassed"><b translate="">Application in progress</b></span> <span ng-if="certification.status === \'applied\' && submissionPassed"><b translate="">Applied</b></span> <span ng-if="certification.status === \'shortlisted\'"><b translate="">Applied</b></span> <span ng-if="certification.status === \'blocked\'"><b translate="">Ineligible</b></span> <span ng-if="certification.status === \'training\'"><b translate="">Onboarding in progress</b></span> <span ng-if="certification.status === \'certified\'"><b translate="">Certified, active reviewer</b></span> <span ng-if="certification.status === \'inactive\'"><b translate="">Certified, inactive reviewer</b></span> </div> </div> </div> </div> ')
    }])
}(),
function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("submissions/directives/certification-view.tmpl.html", '<div ng-if="loading" class="loading"> </div> <div ng-if="!loading">  <div class="row row-gap-small"> </div> <div class="vertical-subway vertical-subway-small"> <div class="row" ng-repeat="onboarding in certification.trainings"> <div class="col-xs-12"> <div class="subway-sign"> <span class="glyphicon" ng-class="{\'glyphicon-ok\': onboarding.status === \'passed\', \'glyphicon-lock\': onboarding.status === \'locked\', \'filled-circle\': [\'passed\', \'locked\'].indexOf(onboarding.status) === -1}"> </span> </div> <div class="subway-content"> <p ng-class="{caption: [\'locked\', \'passed\'].indexOf(onboarding.status) !== -1}"> {{ \'Onboarding review\' | translate }} {{$index + 1}}: {{ onboarding.status | onboardingStatusLabel | translate }} </p> <div> <div ng-if="onboarding.status === \'not_started\'"> <button class="btn btn-secondary" busy-click="start(onboarding.id)"> {{ \'Start Onboarding\' | translate }} </button> <div class="row row-gap-small"></div> <p class="caption-small"> {{ONBOARDING_TIME_LIMIT_MESSAGE}} </p> </div> <div ng-if="onboarding.status !== \'not_started\'"> <div ng-repeat="onboarding_submission in onboarding.training_submissions"> <h4 ng-if="onboarding.onboarding_submission.length > 1 || onboarding.status === \'failed\'" class="h-slim"> {{ \'Attempt\' | translate }} {{$index + 1}} </h4> <div ng-if="!$last"> <a ui-sref="reviews-show({submissionId: onboarding_submission.id, audit: 1})"> {{ \'View feedback\' | translate }} </a> </div> <div ng-if="$last"> <div ng-if="onboarding.status === \'in_progress\'"> <a class="btn btn-secondary" ui-sref="submissions.show({submissionId: onboarding_submission.id})"> {{ \'Continue onboarding\' | translate }} </a> <p></p> <p class="caption-small p-slim"> {{ \'Time left:\' | translate }} {{ onboarding_submission | submissionAssignmentTimeRemaining }} </p> </div> <p class="caption-small" ng-if="onboarding.status === \'in_audit\'" translate=""> Thanks for submitting! A Udacity Coach will be auditing your review within 2 weeks. </p> <div ng-if="onboarding.status === \'failed\' || onboarding.status === \'passed\'"> <a ui-sref="reviews-show({submissionId: onboarding_submission.id, audit: 1})"> {{ \'View feedback\' | translate }} </a> </div> <div ng-if="onboarding.status === \'failed\'"> <div class="row row-gap-small"></div> <h4 class="h-slim">{{ \'Attempt\' | translate }} {{$index + 2}}</h4> <p translate="">Revise your last review based on the Coach\'s feedback.</p> <button class="btn btn-secondary" busy-click="start(onboarding.id)"> {{ \'Re-attempt\' | translate }} </button> <div class="row row-gap-small"></div> <p class="caption-small p-slim"> {{ONBOARDING_TIME_LIMIT_MESSAGE}} </p> </div> </div> <div class="row row-gap-small"></div> </div> </div> </div> </div> </div> </div> <div class="vertical-subway vertical-subway-small"> <div class="row"> <div class="col-xs-12"> <div class="subway-sign"> <span class="glyphicon" ng-class="{\'glyphicon-certificate\': certification.status === \'certified\' || certification.status === \'inactive\', \'filled-circle\': certification.status !== \'certified\' && certification.status !== \'inactive\'}"> </span> </div> <div class="subway-content"> <p ng-if="isCertified()" class="text-muted"><b translate="">Certified</b></p> <p ng-if="!isCertified()" class="text-muted"><b translate="">Certification</b></p> </div> </div> </div> </div> </div>  </div> ')
    }])
}(),
function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("submissions/directives/student-feedbacks-list.tmpl.html", '<p ng-if="ctrl.studentFeedbacks.length === 0"> <i translate="">You do not have any ratings.</i> </p> <div ng-if="ctrl.loading" class="loading"></div> <table class="table borderless" ng-if="ctrl.studentFeedbacks.length > 0"> <tr ng-repeat="studentFeedback in ctrl.studentFeedbacks"> <td class="col-md-2 col-xs-4"> <span uib-rating="" ng-model="studentFeedback.rating" readonly="true" ng-class="{\'background-transition\': isUpdating, black: studentFeedback.read_at}"> </span> </td> <td class="col-md-3 col-xs-4"> <a ui-sref="reviews-show({submissionId: studentFeedback.submission_id})" target="_blank"> {{ studentFeedback.project.name }} </a> </td> <td class="col-md-7 col-xs-4"> {{ studentFeedback.body }} <p class="caption"> <small am-time-ago="studentFeedback.created_at"></small> </p> </td> </tr> </table> ')
    }])
}(),
function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("submissions/templates/confirm-feedback-modal.tmpl.html", '<div> <button type="button" class="close hanging-close" aria-label="close" ng-click="$dismiss()"> </button> <div class="modal-header"> <h2 class="h-slim text-center" translate="">Confirm Submission</h2> </div> <form name="form" class="form-horizontal" novalidate=""> <div class="modal-body"> <div ng-if="submission.rubric.nomination_eligible"> <p> <label class="checkbox-inline"> <input type="checkbox" ng-model="ctrl.nominate">{{ \'Nominate this project for excellence.\' | translate }} </label> </p> <div ng-if="ctrl.nominate"> <div ng-show="!ctrl.isEditing()"> <div class="row row-gap-small"></div> <div marked="ctrl.nomination.reason"></div> <div class="row row-gap-small"></div> </div> <div ng-show="ctrl.isEditing()"> <div><strong translate="">Describe how this project was exceptional.</strong></div> <div markdown-textarea="" form="commentForm"> <textarea rows="4" required="" class="form-control" type="text" name="comment" ng-model="ctrl.nomination.reason">{{ body }}</textarea> </div> </div> </div>  </div>  <p class="text-center"> {{ \'By submitting, you agree that this review meets the\' | translate }} <a target="_blank" ui-sref="rubrics.view({ rubricId: 1144 })">{{ \'Review Quality Specifications\' | translate }}</a>. </p> </div> <div class="modal-footer"> <div class="button-group pull-right"> <button ng-if="ctrl.nominate && ctrl.isEditing()" class="btn btn-secondary" ng-click="ctrl.toggleEdit()"> {{ \'Preview\' | translate }} </button> <button ng-if="ctrl.nominate && !ctrl.isEditing()" class="btn btn-secondary" ng-click="ctrl.toggleEdit()"> {{ \'Edit\' | translate }} </button> <button ng-disabled="ctrl.nominate && (ctrl.isEditing() || !ctrl.nomination.reason)" class="btn btn-primary" type="submit" ng-click="ctrl.submit()"> {{ \'Confirm Submission\' | translate }} </button> </div> </div> </form> </div> ')
    }])
}(),
function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("submissions/templates/confirm-unassign-modal.tmpl.html", '<div> <button type="button" class="close hanging-close" aria-label="close" ng-click="$dismiss()"> </button> <div class="modal-header"> <h2 class="h-slim text-center" translate="">Confirm unassign</h2> </div> <div class="modal-body"> <p class="text-center"> {{ \'If you think a Udacity Coach should review this submission, please also email\' | translate }} <a href="mailto:review-support@udacity.com">review-support@udacity.com</a> {{ \'with the link to the submission\' | translate }}. </p> </div> <div class="modal-footer"> <div class="text-center full-width"> <button class="btn btn-danger" type="submit" ng-click="$close()"> {{ \'Delete review and unassign\' | translate }} </button> </div> </div> </div> ')
    }])
}(),
function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("submissions/templates/quality-specifications.tmpl.html", '<div class="row row-gap-small" ng-controller="QualitySpecificationsCtrl as ctrl"> <div class="col-md-8 col-md-offset-2"> <h1 translate="">Review Quality Specifications</h1> <p translate=""> Reviewers, follow these requirements for all reviews. Some reviews that do not meet our quality specifications may not be financially compensated. </p> <ul class="nav nav-tabs"> <li ng-class="{\'active\': ctrl.isSelectedTab(\'withCode\')}"> <a class="navbar-item" href="" ng-click="ctrl.showTab(\'withCode\')"> {{ \'Projects with code review\' | translate }} </a> </li> <li ng-class="{\'active\': ctrl.isSelectedTab(\'noCode\')}"> <a class="navbar-item" href="" ng-click="ctrl.showTab(\'noCode\')"> {{ \'Other projects\' | translate }} </a> </li> </ul> <section ng-if="ctrl.isSelectedTab(\'withCode\')"> <div class="row row-gap-small"></div> <div rubric-items-list="" rubric-id="ctrl.codeAuditRubricId"></div> </section> <section ng-if="ctrl.isSelectedTab(\'noCode\')"> <div class="row row-gap-small"></div> <div rubric-items-list="" rubric-id="ctrl.noCodeAuditRubricId"></div> </section> <div class="row row-gap-large"></div> </div> </div>')
    }])
}(),
function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("submissions/templates/ready.tmpl.html", '<div class="row row-gap-huge"> <div class="col-sm-4 col-sm-offset-4 text-center"> <img src="assets/images/graderOnboardComplete.svg" alt="" style="width:108px; height:87px;"> <h1 translate="">Great, You\'re Ready!</h1> <p translate="">The course will always be in your My Courses section for future reference.</p> <a ui-sref="submissions.dashboard" class="btn btn-lg btn-primary">{{ \'Start Reviewing\' | translate }}</a> </div> </div> <div class="row row-gap-huge"></div> ')
    }])
}(),
function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("submissions/templates/reviewer-faq.tmpl.html", '<div class="row row-gap-medium"> <div class="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-12 faq-content"> <h1 translate="">Reviewer FAQ</h1> <h2 translate="faq.reviewer.how-to-report-bug-question"></h2> <p translate="faq.reviewer.how-to-report-bug-answer"></p> <h2 translate="faq.reviewer.how-to-report-issue-question"></h2> <p translate="faq.reviewer.how-to-report-issue-answer"></p> <h2 translate="faq.reviewer.how-to-escalate-question"></h2> <p translate="faq.reviewer.how-to-escalate-answer"></p> <h2 translate="faq.reviewer.how-to-mark-cant-review-question"></h2> <p translate="faq.reviewer.how-to-mark-cant-review-answer"></p> <h2 translate="faq.reviewer.minimum-time-question"></h2> <p translate="faq.reviewer.minimum-time-answer"></p> <h2 translate="faq.reviewer.minimum-number-of-submissions-question"></h2> <p translate="faq.reviewer.minimum-number-of-submissions-answer"></p> <h2 translate="faq.reviewer.how-to-receive-payment-question"></h2> <p translate="faq.reviewer.how-to-receive-payment-answer"></p> <h2 translate="faq.reviewer.how-to-pay-taxes-question"></h2> <p translate="faq.reviewer.how-to-pay-taxes-answer"></p> <h2 translate="faq.reviewer.cant-see-projects-question"></h2> <p translate="faq.reviewer.cant-see-projects-answer"></p> <h2 translate="faq.reviewer.previous-reviewer-disagreement-question"></h2> <p translate="faq.reviewer.previous-reviewer-disagreement-answer"></p> <h2 translate="faq.reviewer.dynamic-pricing-question"></h2> <p translate="faq.reviewer.dynamic-pricing-answer"></p> <h2 translate="faq.reviewer.dispute-resolution-terms-question"></h2> <p translate="faq.reviewer.dispute-resolution-terms-answer"></p> </div> <br> </div> ')
    }])
}(),
function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("submissions/templates/student-faq.tmpl.html", '<div class="row row-gap-medium"> <div class="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-12 faq-content"> <h1 translate="">Student Project Review FAQ</h1> <h2 translate="">All of my projects met specifications! When will I receive my certificate?</h2> <p> {{ \'Once you have completed all required projects, you will be prompted to start your graduation process. This includes verifying your identity and completing a final reflection survey. Some students may or may not be asked to participate in an exit interview. If you have additional questions, please email\' | translate }} <a href="mailto: graduation-review-support@udacity.com">graduation-review-support@udacity.com</a>.</p> <h2 translate="">When will my project be reviewed?</h2> <p translate="">Project reviews are often completed in about 24 hours, something that Udacity strives for! As noted in your student handbook, "Due to the high volume of submissions and the time it may take your project reviewer to give personalized feedback, the turnaround period for project evaluations may be up to 1 week." Your student handbook can be found in your "Resources" section in your student portal.</p> <h2 translate="">I forgot a file or need to make a change to my project! How do I cancel a submission?</h2> <p> {{ \'You can view instructions on how to cancel a project\' | translate }} <a href="https://udacity.zendesk.com/hc/en-us/articles/210743526-How-do-I-cancel-a-project-submission-">{{ \'here\' | translate }}</a>. If your project is already being reviewed you will not have the option to cancel it.</p> <h2 translate="">How do I zip my project to upload it for review?</h2> <p>{{ \'We have instructions on how to zip a file\' | translate }} <a href="https://docs.google.com/document/d/1jPCDXBuD4xV8PsGLa5K9Fpn_9lSCTrXeOWcUKQGnATU/edit#heading=h.9pqdvn5gx0xl">{{ \'here\' | translate }}</a>.</p> <h2 translate="">I have a question about my review!</h2> <p> {{ \'Contact\' | translate }} <a href="mailto:review-support@udacity.com">review-support@udacity.com</a> {{ \'with a link to the review and your questions\' | translate }}. </p> <h2 translate="">How can I ask a reviewer a question about my feedback?</h2> <p> {{ \'Contact\' | translate }} <a href="mailto:review-support@udacity.com">review-support@udacity.com</a> {{ \'with a link to the review and your questions\' | translate }}. </p> <h2 translate="">My project didn’t receive a status of "Exceeds Specifications" - why is that?</h2> <p> {{ \'Exceeds Specifications is no longer used for Project Reviews. All submissions will receive a response of either “Meets Specifications” or “Requires Changes”. You can find more info\' | translate }} <a href="https://discussions.udacity.com/t/exceeds-specifications-will-be-retired-on-march-31/161702">here</a>.</p> <h2 translate="">I’m trying to submit my project and get the following error: “Your zip file contains more than 1,000 files. Please re-submit a smaller zip file.”</h2> <p><strong>{{ \'Android\' | translate }}:</strong> {{ \'Did you try cleaning your project? Often, the 1000 file limit error occurs because of the files that are generated in the build folder of your app at the time of building your project. These files can be generated by the code reviewers, so feel free to remove them. Here’s a\' | translate }} <a href="https://docs.google.com/document/d/1eYvuXY7GRE6VQpq4Rp-KotU1ti-JEySN1KdyKwjhzEQ/pub?embedded=true">{{ \'document\' | translate }}</a> {{ \'that explains how to clean your project on Android Studio before you generate a zip or push the application on Github! If you have additional issues please contact\' | translate }} <a href="mailto:review-support@udacity.com">review-support@udacity.com</a>.</p> <p><strong>{{ \'FEND\' | translate }}:</strong> {{ \'Have you checked to see if you included the node_modules folder? This folder can include multiple files that can cause this error. You can find more information regarding how to clean up the node_modules from your project\' | translate }} <a href="https://discussions.udacity.com/t/how-to-remove-node-modules-directory-from-github-respository/40929">here</a>. {{ \'If you have additional issues please contact\' | translate }} <a href="mailto:review-support@udacity.com">review-support@udacity.com</a>.</p> <p><strong>{{ \'iOS\' | translate }}:</strong> {{ \'Sometimes Xcode can create a hidden directory structure in the project folder. Before doing anything we highly recommend you backup your entire project! Once it has been backed up you’ll need to find the hidden directory and remove it. This should now allow you to upload your project. If you have additional issues please contact\' | translate }} <a href="mailto:review-support@udacity.com">review-support@udacity.com</a>.</p> <h2 translate="">I’m trying to submit my project and get the following error: “You can\'t resubmit because you already have a submission outstanding.”</h2> <p> {{ \'This error appears when you already have a submission awaiting review for the project in the system. If you believe you have seen this in error please contact\' | translate }} <a href="mailto:review-support@udacity.com">review-support@udacity.com</a>.</p> <h2 translate="">I’m trying to submit my project and get an error mentioning I have the wrong file type.</h2> <p translate="">This error appears when you submit a file type that is not supported for the project. When submitting you should see under the option “Upload File” a list of the file types we accept for the project.</p> <h2 translate="">I’m trying to resubmit my project but received an error stating that I can\'t resubmit because I\'ve already passed this project. How do I resubmit?</h2> <p translate="">We think of projects as a way for the student to demonstrate mastery of a certain set of skills. Once a project has met specifications, we expect the student to want to move on to the next set of skills. So there currently is no way to resubmit a project. You can see the result of your project submission at the top of the “Project Review” tab on the review of your project.</p> <h2 translate="">How do I become a reviewer?</h2> <p> {{ \'Go to our\' | translate }} <a href="https://review.udacity.com/apply.html">{{ \'application page\' | translate }}</a> {{ \'for more information\' | translate }}.</p> </div> </div> ')
    }])
}(),
function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("submissions/templates/submission-details.tmpl.html", '<div class="row row-gap-medium"> <div class="col-md-8 col-md-offset-2"> <h1 class="h-slim">{{ currentProject.name }}</h1> <h4 ng-if="submission.previous_submission_id">{{ \'REVISED REVIEW\' | translate }}</h4> <div class="plagiarism-alert" ng-if="hasPlagiarizedSubmission()"> <p>⚠️ <strong>{{ \'Plagiarism warning\' | translate }}</strong>: {{ \'a previous version of this student’s submission was found to be plagiarized. Be sure to compare the latest submission against previous versions to make sure that all problems were addressed.\' | translate }}</p> </div> <ul class="nav nav-tabs"> <li ng-if="!currentProject.is_cert_project" ng-class="{\'active\': currentTab == \'\'}"> <a class="navbar-item" href="" ng-click="showTab(\'\')">{{ \'Student Notes\' | translate }}</a> </li> <li ng-class="{\'active\': currentTab == \'resources\'}"> <a class="navbar-item" href="" ng-click="showTab(\'resources\')"> {{ \'Resources\' | translate }}</a> </li> <li ng-if="isCodeShown()" ng-class="{\'active\': currentTab == \'code\'}"> <a class="navbar-item" href="" ng-click="showTab(\'code\')">{{ \'Code Review\' | translate }}</a> </li> <li ng-if="isAnnotationShown()" ng-class="{\'active\': currentTab == \'annotation\'}"> <a class="navbar-item" href="" ng-click="showTab(\'annotation\')">{{ \'Annotations\' | translate }}</a> </li> <li ng-class="{\'active\': currentTab == \'feedback\'}"> <a class="navbar-item" href="" ng-click="showTab(\'feedback\')">{{ \'Project Review\' | translate }}</a> </li> <li ng-if="showPastReviews" ng-class="{\'active\': currentTab == \'reviews\'}"> <a class="navbar-item" href="" ng-click="showTab(\'reviews\')">{{ \'Project History\' | translate }}</a> </li> </ul> </div> </div> <div class="row row-gap-medium"> <div class="col-md-8 col-md-offset-2"> <section ng-show="currentTab == \'\'"> <div class="submission-notes"> <span ng-if="submission.notes" marked="submission.notes"></span> <span ng-if="!submission.notes">{{ \'None provided\' | translate }}</span> </div> <div ng-if="submission.notes"> <div class="row row-gap-small"></div> <p ng-if="!isSubmissionCompleted()" class="like-link" ng-click="moveToAdditionalComment()"> <span class="glyphicon glyphicon-share-alt" aria-hidden="true"></span>&nbsp; {{ \'Reply to the student\' | translate }} </p> </div> </section> <section class="resources" ng-show="currentTab == \'resources\'"> <h2 translate="">Reviewer Toolkit</h2> <p ng-if="toolkit_url"><span ng-if="isToolkitBadgeVisible" class="badge">{{ \'New Update\' | translate }}</span> <a class="resource-toolkit" ng-click="updateToolkitLastView()" href="{{toolkit_url}}" download=""> {{ \'Download Reviewer Toolkit\' | translate }} </a> - {{ \'Updated on\' | translate}}: {{updatedOnText()}} </p> <p ng-if="!toolkit_url">{{ \'No toolkit available for download\' | translate }}</p> <h2 translate="">Project Rubric</h2> <p>{{ \'The\' | translate }} <strong translate="">{{ \'Reviewer Tips column\' | translate }}</strong> {{ \'in\' | translate }} <a ui-sref="rubrics.view({rubricId: currentRubric.id})">{{ \'the rubric\' | translate }}</a> {{ \'is only visible to reviewers. Feel free to refer to this rubric in comments to students\' | translate }}.</p> <h2 translate="">Project Description</h2> <p marked="currentRubric.description" ng-if="currentRubric.description && !currentProject.is_cert_project"></p> <p ng-bind-html="currentRubric.description" ng-if="currentRubric.description && currentProject.is_cert_project"></p> </section> <section ng-show="currentTab == \'code\'"> <p translate=""> Click a filename to expand the code, then click the line you wish to comment upon. We\'d like to see at least 5 comments, but hopefully more. Thanks! </p> <div code-review="" ng-if="files && currentRubric" files="files" rubric="currentRubric" allow-comments="!isSubmissionCompleted()"></div> </section> <section ng-show="currentTab == \'annotation\'"> <div class="row"> <div class="col-xs-12" translate=""> Enhance the Project Review by annotating the student’s submission. </div> </div> <h3 translate="">Attach annotated .pdf</h3> <p translate="">If you have multiple annotation files, merge them into a single .pdf</p> <div ng-class="{\'has-error\': pdfErrorMessage}" class="form-group text-left"> <div class="row"> <div class="col-xs-8 col-md-7"> <button ngf-select="" ng-model="pdfFile" type="button" class="btn btn-default" accept="application/pdf"> {{ \'Choose file\' | translate }} </button> &nbsp;{{ pdfName ? pdfName : \'no file chosen\' | translate }} <p class="caption p-slim"><small translate="">10 MB limit</small></p> </div> <div class="col-xs-4 form-error" ng-bind-html="pdfErrorMessage"></div> </div> </div> <h3 translate="">Guide</h3> <div class="vertical-subway vertical-subway-small"> <div class="row"> <div ng-if="submission.url" class="col-xs-12"> <div class="subway-sign"> <span class="glyphicon filled-circle">&nbsp;</span> </div> <div class="subway-content"> <p> {{ \'Take a full-length screenshot of the student’s submission using a tool such as\' | translate }} <a href="https://chrome.google.com/webstore/detail/save-to-google-drive/gmbmikajjgmnabiglmofipeabaddhgne?hl=en" target="_blank" translate="">{{ \'Save to Google Drive\' | translate}}</a>. </p> </div> </div> </div> <div class="row"> <div class="col-xs-12"> <div class="subway-sign"> <span class="glyphicon filled-circle"></span> </div> <div class="subway-content"> <p>{{ \'Import the student’s submission into an annotation tool such as\' | translate }} <a href="https://web.kamihq.com/" target="_blank" translate="">Kami</a>, {{ \'which is free and web-based\' | translate }}.</p> <p translate="">{{ \'Use the various types of annotations to give the student constructive and positive feedback\' | translate }}.</p> <div class="row row-gap-small"> <div class="col-xs-12"> <p> <img class="page-icon page-icon-gutter" src="/assets/images/annotations-chart.svg"> <img class="page-icon page-icon-gutter" src="/assets/images/annotations-text.svg"> </p> </div> </div> <div class="row row-gap-small"> <div class="col-xs-12"> <p translate="">Start your comments with a label “Required:” “Suggestion:” or “Awesome:”</p> <p> <img class="page-icon-gutter" src="/assets/images/required.svg"> <img class="page-icon-gutter" src="/assets/images/suggestion.svg"> <img class="page-icon-gutter" src="/assets/images/awesome.svg"> </p> </div> </div> </div> </div> </div> <div class="row"> <div class="col-xs-12"> <div class="subway-sign"> <span class="glyphicon filled-circle"></span> </div> <div class="subway-content" translate=""> Export the annotated file as a .pdf </div> </div> </div> </div> </section> <section ng-show="currentTab == \'feedback\'"> <div ng-if="!isSubmissionCompleted() && !currentProject.is_cert_project"> <p translate="">Are you unable to review the project due to a compilation error, missing files, etc.? Is this submission plagiarized? Do you need to report the student for abusive language?</p> <button type="button" class="btn btn-default" ng-click="showUngradeableModal()"> {{ \'Can\\\'t review\' | translate }} </button> <div class="row row-gap-medium"></div> </div> <div ng-if="!hasCritiques"> {{ \'This project is a non-graded project. Your only job as a reviewer is to provide a code review.\' | translate }} </div> <div ng-if="hasCritiques && critiquesAccessor"> <div critiques-editor="" critiques-accessor="critiquesAccessor" editable="!isSubmissionCompleted()" state="critiquesState" submission="submission"> </div> </div> <div class="row row-gap-small"></div> </section> <section ng-if="pastReviews.length > 0" ng-show="currentTab == \'reviews\'"> <p ng-if="latestReview" translate=""> You’re reviewing a resubmission. For continuity, you can reference the student’s past submissions and reviews. We recommend that you draft an independent review of the project before viewing past reviews. </p> <p ng-if="!latestReview" translate=""> This is a past submission. See below for the full submission history. </p> <div reviews-list="" reviews="pastReviews" this-review="submission"></div> </section> </div> </div>  <div class="row row-gap-medium"></div> <div class="row row-gap-huge"></div> <footer sticky-footer="" class="assessment-footer row" label="Assessment controls" role=""> <hr class="hr-slim"> <div class="col-xs-12 col-md-8 col-md-offset-2"> <a ng-if="submission.archive_url" href="{{ submission.archive_url }}" class="download btn btn-default"> <i class="glyphicon glyphicon-download-alt"></i>&nbsp;{{ \'Download Project\' | translate }} </a> <a target="_blank" ng-if="submission.url" href="{{ submission.url }}" class="download btn btn-default"> <i class="glyphicon glyphicon-new-window"></i>&nbsp;{{ \'Project Link\' | translate }} </a> <div class="pull-right" ng-if="!isSubmissionCompleted()"> <a href="" class="unassign" ng-click="confirmUnassign()"> {{ \'Unassign Myself\' | translate }} </a> <button busy-click="confirmEvaluationSubmit()" type="submit" ng-disabled="critiquesState.editing" class="btn btn-primary"> <i class="glyphicon glyphicon-check"></i> {{ \'Submit Feedback\' | translate }} </button> </div> </div> </footer> ')
    }])
}(),
function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("submissions/templates/ungradeable-modal.tmpl.html", '<div> <button type="button" class="close hanging-close" aria-label="close" ng-click="$dismiss()"> </button> <div class="modal-header"> <p translate="UNGRADEABLE_TITLE"></p> </div> <form name="form" class="form-horizontal" novalidate=""> <div ng-if="ctrl.isEditing()"> <div class="modal-body"> <p> <span translate="UNGRADEABLE_TAG_INSTRUCTIONS"></span> </p> <div class="btn-group" uib-dropdown=""> <button id="split-button" type="button" class="btn btn-default btn-xs">{{ ctrl.selectedReason.text | translate }}</button> <button type="button" class="btn btn-default btn-xs" uib-dropdown-toggle=""> <span class="caret"></span> <span class="sr-only" translate="">Split button!</span> </button> <ul class="dropdown-menu" role="menu"> <li role="menuitem" ng-repeat="reason in ctrl.reasons"> <a href="" ng-click="ctrl.selectedReason = reason"> {{ reason.text | translate }} </a> </li> </ul> </div> </div> <div markdown-textarea="" form="ungradeableForm" class="ungradeable-modal-fieldgroup"> <div ng-if="ctrl.selectedReason.tag === \'plagiarism\'"> <p>{{ \'UNGRADEABLE_PLAGIARISM_SOURCE_INSTRUCTIONS\' | translate }}</p> <input ng-model="ctrl.plagiarismSourceUrl" class="form-control"> <p>{{ \'UNGRADEABLE_PLAGIARISM_INSTRUCTIONS\' | translate }}</p> </div> <p ng-if="ctrl.selectedReason.tag === \'missing_requirements\'"> {{ \'UNGRADEABLE_MISSING_REQUIREMENTS_INSTRUCTIONS\' | translate }} </p> <p ng-if="ctrl.selectedReason.tag === \'abuse\'"> {{ \'UNGRADEABLE_ABUSE_INSTRUCTIONS\' | translate }} </p> <p ng-if="ctrl.selectedReason.tag === \'language\'"> {{ \'UNGRADEABLE_LANGUAGE_INSTRUCTIONS\' | translate }} </p> <p ng-if="ctrl.shownToStudent()" style="margin-top:0px;"> <strong>{{ \'SHOWN_TO_STUDENT\' | translate }}</strong> </p> <textarea required="" ng-model="ctrl.notes" class="form-control" rows="4"></textarea> </div> <div class="modal-footer"> <div class="pull-left"> <button id="preview-button" class="btn btn-secondary" ng-disabled="ctrl.incomplete()" type="submit" ng-click="ctrl.toggleEdit()"> {{ \'Preview\' | translate }} </button> </div> </div> </div> <div ng-if="!ctrl.isEditing()"> <div class="modal-body"> <p ng-hide="ctrl.shownToStudent()" translate="UNGRADEABLE_ESCALATE_CONFIRMATION"></p> <p ng-show="ctrl.shownToStudent()" translate="UNGRADEABLE_REVIEW_CONFIRMATION"></p> <div ng-show="ctrl.plagiarismSourceUrl"> <h4 class="ungradeable-info" translate="" style="display: inline;"> Potential Source URL</h4> <a href="{{ctrl.plagiarismSourceUrl}}" ng-show="ctrl.plagiarismSourceUrl">{{ ctrl.plagiarismSourceUrl }}</a> </div> <div style="margin-top: 30px;"><strong translate="">Reviewer Comments</strong></div> <div class="inline-comment" marked="ctrl.notes"></div> </div> <div class="modal-footer"> <div class="ungradeable-submit-footer"> <button class="btn btn-primary" ng-disabled="ungradeableForm.$invalid" type="submit" busy-click="ctrl.submit()"> {{ \'Submit\' | translate }} </button> <button class="btn btn-default" type="submit" ng-click="ctrl.toggleEdit()"> {{ \'Edit\' | translate }} </button> <p> {{ \'For projects that are missing requirements you will receive $\' | translate }}{{ctrl.project.ungradeable_price}}. <br> {{ \'For plagiarized projects you will receive the full project price.\' | translate }} </p> </div> </div> </div> </form> </div> ')
    }])
}(),
function(t) {
    try {
        t = angular.module("udacity.templates")
    } catch (e) {
        t = angular.module("udacity.templates", [])
    }
    t.run(["$templateCache", function(e) {
        e.put("submissions/templates/vote-feedback-modal.tmpl.html", '<div> <button type="button" class="close hanging-close" aria-label="close" ng-click="$dismiss()"> </button> <div ng-if="!ctrl.isEditing()"> <div class="modal-body"> <div class="row"> <div class="col-xs-10 col-xs-offset-1"> <h3>{{ \'Tell us about this review\' | translate }}</h3> <textarea ng-model="votes[ctrl.submissionId].feedback" wrap="soft" class="form-control" rows="3" placeholder="{{ ctrl.placeholder | translate }}"></textarea> </div> </div> </div> <div class="modal-footer"> <button class="btn btn-primary" type="button" ng-click="ctrl.submit()">{{ \'Submit\' | translate }}</button> </div> </div> </div>')
    }])
}();