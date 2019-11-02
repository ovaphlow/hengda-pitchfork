package hengda.pitchfork;

import com.google.gson.Gson;
import io.grpc.stub.StreamObserver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class UserServiceImpl extends UserGrpc.UserImplBase {
    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    @Override
    @SuppressWarnings("unchecked")
    public void commonUserSignIn(UserRequest req, StreamObserver<UserReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try {
            Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
            Connection conn = DBUtil.getConn();
            String sql = "select id, master_id, username, name, phone, " +
                    "(select v from public.common_data where id = u.master_id) as dept, " +
                    "(select super from cheliangduan.auth where user_id = u.id) as super " +
                    "from public.user as u " +
                    "where username = ? and password = ?";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, body.get("username").toString());
            ps.setString(2, body.get("password").toString());
            ResultSet rs = ps.executeQuery();
            List<Map<String, Object>> result = DBUtil.getList(rs);
            if (result.size() != 1) {
                resp.put("message", "帐号或密码错误");
            } else {
                resp.put("content", result.get(0));
            }
            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
            resp.put("message", "gRPC服务器错误");
        }

        UserReply reply = UserReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void superUserSignIn(UserRequest req, StreamObserver<UserReply> responseObserver) {

        Gson gson = new Gson();
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try {
            Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
            Connection conn = DBUtil.getConn();
            String sql = "select id, master_id, username, name, phone, " +
                    "(select v from public.common_data where id = u.master_id) as dept, " +
                    "(select super from cheliangduan.auth where user_id = u.id) as super " +
                    "from public.user as u " +
                    "where username = ? and password = ? and super = 1";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, body.get("username").toString());
            ps.setString(2, body.get("password").toString());
            ResultSet rs = ps.executeQuery();
            List<Map<String, Object>> result = DBUtil.getList(rs);
            if (result.size() != 1) {
                resp.put("message", "帐号或密码错误");
            } else {
                resp.put("content", result.get(0));
            }
            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
            resp.put("message", "gRPC服务器错误");
        }

        UserReply reply = UserReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }
}
